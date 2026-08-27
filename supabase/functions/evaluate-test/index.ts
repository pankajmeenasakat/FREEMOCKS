// Supabase Edge Function: evaluate-test
// Asynchronous scoring, accuracy calculation, and attempt record update

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { attemptId, testId, responses } = await req.json();
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch original questions with correct options and scoring weights
    const { data: questions, error: qError } = await supabase
      .from("questions")
      .select("id, correct_option_id, scoring, section_name")
      .eq("test_id", testId);

    if (qError || !questions) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch test questions" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let totalScore = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let attemptedCount = 0;

    const evaluated = responses.map((userResp: any) => {
      const question = questions.find((q) => q.id === userResp.questionId);
      if (!question) return userResp;

      const isAttempted = Boolean(userResp.selectedOptionId);
      const isCorrect = isAttempted && userResp.selectedOptionId === question.correct_option_id;

      if (isAttempted) {
        attemptedCount++;
        if (isCorrect) {
          totalScore += question.scoring.positive;
          correctCount++;
        } else {
          totalScore += question.scoring.negative;
          wrongCount++;
        }
      }

      return {
        ...userResp,
        isCorrect,
        correctOptionId: question.correct_option_id,
        sectionName: question.section_name,
      };
    });

    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;

    // Calculate approximate percentile against completed attempts
    const { count: lowerScoresCount } = await supabase
      .from("user_test_attempts")
      .select("id", { count: "exact", head: true })
      .eq("test_id", testId)
      .eq("status", "completed")
      .lt("score", totalScore);

    const { count: totalAttemptsCount } = await supabase
      .from("user_test_attempts")
      .select("id", { count: "exact", head: true })
      .eq("test_id", testId)
      .eq("status", "completed");

    const totalCompetitors = totalAttemptsCount || 1;
    const percentile = totalCompetitors > 0 ? ((lowerScoresCount || 0) / totalCompetitors) * 100 : 95.0;

    const { error: updateError } = await supabase
      .from("user_test_attempts")
      .update({
        score: parseFloat(totalScore.toFixed(2)),
        accuracy: parseFloat(accuracy.toFixed(2)),
        percentile: parseFloat(percentile.toFixed(2)),
        status: "completed",
        responses: evaluated,
        submitted_at: new Date().toISOString(),
      })
      .eq("id", attemptId);

    if (updateError) {
      return new Response(
        JSON.stringify({ error: updateError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        score: totalScore,
        accuracy,
        percentile,
        correctCount,
        wrongCount,
        attemptedCount,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
