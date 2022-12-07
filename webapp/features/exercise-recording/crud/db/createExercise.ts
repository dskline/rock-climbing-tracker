import initSupabase from '@/features/db/initSupabase';

export async function createPushupExercise(sessionId: string, reps: number) {
  const supabase = initSupabase();

  const { data } = await supabase
    .from("session_exercises")
    .insert([
      {
        type: "PUSHUP",
        session_id: sessionId,
        data: {
          reps: reps,
        },
      },
    ])
    .select("exercise_id");

  if (!data) {
    return {
      error: "Error creating session data",
    }
  }

  return supabase.from("exercise_pushups").insert([
    {
      id: data[0].exercise_id,
      reps: reps,
    },
  ]);
}
