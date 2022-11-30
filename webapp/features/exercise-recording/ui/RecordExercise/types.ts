import { EXERCISES } from "./Exercises";

type ExerciseWithReps = {
  reps: number;
};

export type Exercise = {
  type: keyof typeof EXERCISES;
  data: ExerciseWithReps;
};

export type Session = {
  id: string;
  start_time: string;
  end_time?: string;
  session_exercises: Array<Exercise>;
};
