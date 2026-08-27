// Cloudflare Worker: exam-sync.ts
// KV-backed live exam timer and heartbeat session sync

export interface Env {
  EXAM_KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response("ok", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    try {
      const { userId, testId, action, payload } = await request.json();
      const sessionKey = `cbt_session:${testId}:${userId}`;

      if (action === "START") {
        const durationSeconds = payload?.durationSeconds || 3600;
        const endTime = Date.now() + durationSeconds * 1000;
        const sessionData = {
          startTime: Date.now(),
          endTime,
          durationSeconds,
          answers: {},
          lastSyncAt: Date.now(),
        };

        // Cache session in Cloudflare KV with TTL
        await env.EXAM_KV.put(sessionKey, JSON.stringify(sessionData), {
          expirationTtl: durationSeconds + 3600,
        });

        return new Response(
          JSON.stringify({
            success: true,
            remainingSeconds: durationSeconds,
            endTime,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      if (action === "HEARTBEAT" || action === "SYNC") {
        const rawSession = await env.EXAM_KV.get(sessionKey);
        if (!rawSession) {
          return new Response(
            JSON.stringify({ error: "SESSION_EXPIRED", isTimeUp: true }),
            {
              status: 401,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
        }

        const session = JSON.parse(rawSession);
        const remainingSeconds = Math.max(0, Math.floor((session.endTime - Date.now()) / 1000));
        const isTimeUp = remainingSeconds <= 0;

        if (payload?.responses) {
          session.answers = { ...session.answers, ...payload.responses };
          session.lastSyncAt = Date.now();
          await env.EXAM_KV.put(sessionKey, JSON.stringify(session));
        }

        return new Response(
          JSON.stringify({
            success: true,
            remainingSeconds,
            isTimeUp,
            serverTimestamp: Date.now(),
          }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      }

      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
  },
};
