import initSupabase from "@/features/db/initSupabase";
import { Exercise } from "@/features/exercise-recording/types";
import { getDatabaseTable } from "@/features/exercise-recording/exercises/Exercises";

export async function updateExercise(exercise: Exercise<any>) {
  const supabase = initSupabase();

  await supabase
    .from("session_exercises")
    .update([
      {
        data: exercise.data,
      },
    ])
    .eq("exercise_id", exercise.exercise_id);

  const table = getDatabaseTable(exercise.type);
  await supabase.from(table).update(exercise.data).eq("id", exercise.exercise_id);
}
