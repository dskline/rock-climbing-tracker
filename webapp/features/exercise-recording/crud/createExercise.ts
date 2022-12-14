import initSupabase from '@/features/db/initSupabase'
import { Exercise, ExerciseCategory } from '@/features/exercise-recording/types'
import { WeightedExercises, WeightedTable } from '@/features/exercise-recording/exercises/weighted/types'
import { BodyweightExercises, BodyWeightTable } from '@/features/exercise-recording/exercises/bodyweight/types'
import { getDatabaseTable } from '../exercises/Exercises';

type Options<T extends ExerciseCategory> = Exercise<T> & {
  sessionId: string;
};
export async function createExercise<T extends ExerciseCategory>(
  options: Options<T>
) {
  const supabase = initSupabase();
  const { type, sessionId, data } = options;

  const { data: insertedSessionExercise } = await supabase
    .from("session_exercises")
    .insert([
      {
        type,
        session_id: sessionId,
        data,
      },
    ])
    .select("exercise_id, data, type");

  if (!insertedSessionExercise) {
    return {
      error: "Error creating session data",
    };
  }

  const table = getDatabaseTable(type)


  const exerciseId = insertedSessionExercise[0].exercise_id;
  const { error } = await supabase.from(table).insert([
    {
      id: exerciseId,
      ...data,
    },
  ]);

  return { data: insertedSessionExercise[0], error };
}
