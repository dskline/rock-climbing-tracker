import {
  WeightedExercises,
  WeightedExerciseData,
} from "@/features/exercise-recording/exercises/weighted/types";

import {
  BodyWeightExerciseData,
  BodyweightExercises,
} from "@/features/exercise-recording/exercises/bodyweight/types";

export type ExerciseCategory =
  | keyof typeof BodyweightExercises
  | keyof typeof WeightedExercises;

export type Exercise<T extends ExerciseCategory> = {
  exercise_id?: string;
  type: T;
  data?: T extends keyof typeof BodyweightExercises
    ? BodyWeightExerciseData
    : T extends keyof typeof WeightedExercises
    ? WeightedExerciseData
    : never;
};
export type ExerciseMetadata = {
  id: ExerciseCategory;
  name: string;
  description: string;
  icon: string;
}
export type ExerciseSet = Array<Exercise<any>>;

export type Session = {
  id: string;
  start_time: string;
  is_active: boolean;
  session_exercises: Array<Exercise<any>>;
};

export type CreateSessionOptions = {
  sessionPlanId: string;
}
