import initSupabase from "@/features/db/initSupabase";
import {
  Exercise,
  ExerciseCategory,
} from "@/features/exercise-recording/types";
import { getDatabaseTable } from "../exercises/Exercises";

export async function createExercise<T extends ExerciseCategory>(
  exercise: Exercise<T>
) {
  const supabase = initSupabase();

  const { data: insertedSessionExercise } = await supabase
    .from("session_exercises")
    .insert([exercise])
    .select("exercise_id");

  if (!insertedSessionExercise) {
    return {
      error: "Error creating session data",
    };
  }

  const table = getDatabaseTable(exercise.type);

  const exerciseId = insertedSessionExercise[0].exercise_id;
  const { error } = await supabase.from(table).insert([
    {
      id: exerciseId,
      ...exercise.data,
    },
  ]);

  return { data: insertedSessionExercise[0], error };
}
