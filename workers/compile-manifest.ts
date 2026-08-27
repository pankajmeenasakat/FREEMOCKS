// Cloudflare Worker: compile-manifest.ts
// Sanitizes test questions and produces R2-cached static test manifests for zero-latency CBT load

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  R2_BUCKET: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const testId = url.searchParams.get("testId");

    if (!testId) {
      return new Response(JSON.stringify({ error: "Missing testId parameter" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      // 1. Fetch test details
      const testRes = await fetch(
        `${env.SUPABASE_URL}/rest/v1/tests?id=eq.${testId}&select=*`,
        {
          headers: {
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
        }
      );
      const testList = await testRes.json();
      const testMeta = testList[0];

      if (!testMeta) {
        return new Response(JSON.stringify({ error: "Test not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 2. Fetch raw questions (bypassing RLS with service key)
      const questionsRes = await fetch(
        `${env.SUPABASE_URL}/rest/v1/questions?test_id=eq.${testId}&order=order_index.asc`,
        {
          headers: {
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
        }
      );
      const rawQuestions = await questionsRes.json();

      // 3. Sanitize questions (strip correct_option_id to prevent any frontend client cheating)
      const sanitizedQuestions = rawQuestions.map((q: any) => ({
        id: q.id,
        sectionName: q.section_name,
        orderIndex: q.order_index,
        content: {
          en: {
            question: q.content.en.question,
            options: q.content.en.options,
          },
          hi: {
            question: q.content.hi.question,
            options: q.content.hi.options,
          },
        },
        scoring: q.scoring,
        metadata: q.metadata,
      }));

      const manifestPayload = {
        testId: testMeta.id,
        title: testMeta.title,
        durationSeconds: testMeta.duration_seconds,
        totalMarks: testMeta.total_marks,
        totalQuestions: testMeta.total_questions,
        questions: sanitizedQuestions,
        generatedAt: new Date().toISOString(),
      };

      // 4. Save sanitized manifest to Cloudflare R2
      const manifestKey = `manifests/${testId}.json`;
      await env.R2_BUCKET.put(manifestKey, JSON.stringify(manifestPayload), {
        httpMetadata: {
          contentType: "application/json",
          cacheControl: "public, max-age=86400",
        },
      });

      return new Response(
        JSON.stringify({
          success: true,
          manifestKey,
          totalQuestions: sanitizedQuestions.length,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
