import initSupabase from '@/features/db/initSupabase'
import { Exercise, ExerciseCategory } from '@/features/exercise-recording/types'
import { WeightedExercises, WeightedTable } from '@/features/exercise-recording/exercises/weighted/types'
import { BodyweightExercises, BodyWeightTable } from '@/features/exercise-recording/exercises/bodyweight/types'

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
    .select("exercise_id");

  if (!insertedSessionExercise) {
    return {
      error: "Error creating session data",
    };
  }

  let table;
  if (BodyweightExercises.hasOwnProperty(type)) {
    table = BodyWeightTable;
  } else if (WeightedExercises.hasOwnProperty(type)) {
    table = WeightedTable;
  }

  if (!table) {
    return {
      error: `Error: couldn't find table for type ${type}`,
    };
  }

  return supabase.from(table).insert([
    {
      id: insertedSessionExercise[0].exercise_id,
      ...data,
    },
  ]);
}
