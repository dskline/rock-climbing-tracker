import initSupabase from "@/features/db/initSupabase";

export const getExercises = async (sessionId: string) => {
  const supabase = initSupabase();

  return supabase
    .from("session_exercises")
    .select("exercise_id, data, type, set_number")
    .order("set_number", { ascending: false })
    .eq("session_id", sessionId);
};
