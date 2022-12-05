type ExerciseWithReps = {
  reps: number;
};

const DATA_TYPES = {
  ExerciseWithReps: {
    reps: "number",
  }
}

export type Exercise = {
  name: string;
  description: string;
  icon: string;
  dataType: keyof typeof DATA_TYPES;
}

export type Session = {
  id: string;
  start_time: string;
  end_time?: string;
  session_exercises: Array<Exercise>;
};
