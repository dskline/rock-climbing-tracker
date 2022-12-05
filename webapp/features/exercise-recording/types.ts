const EXERCISE_TYPES = {
  'ExerciseWithReps': {
    reps: 0
  }
};

type ExerciseTypes = typeof EXERCISE_TYPES;

export type Exercise<T extends keyof ExerciseTypes> = {
  type: T;
  name: string;
  description: string;
  icon: string;
  data?: ExerciseTypes[T];
}

export type Session = {
  id: string;
  start_time: string;
  end_time?: string;
  session_exercises: Array<Exercise<any>>;
};
