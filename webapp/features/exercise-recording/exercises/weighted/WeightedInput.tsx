import { Exercise } from "@/features/exercise-recording/types";
import { WeightedExercises } from "@/features/exercise-recording/exercises/weighted/types";
import { runFetch, runUpdateFetch } from "@/features/utilities/runFetch";

type Props = {
  exercise: Exercise<keyof typeof WeightedExercises>;
  sessionId: string;
  onChange: (exercise: Exercise<keyof typeof WeightedExercises>) => void;
};
export const WeightedInput = ({ exercise, sessionId, onChange }: Props) => {
  const handleSubmit = async () => {
    if (exercise.data) {
      const { reps, weight } = exercise.data;
      if (reps && weight) {
        if (!exercise.exercise_id) {
          // Create a new exercise
          const newExercise = await runFetch(
            "PUT",
            `/api/sessions/${sessionId}/exercises`,
            exercise
          );
          onChange(newExercise);
        } else {
          // Update an existing exercise
          await runUpdateFetch(
            `/api/exercises/${exercise.exercise_id}`,
            exercise
          );
        }
      }
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="# reps"
          type="text"
          value={exercise.data?.reps}
          onChange={(event) => {
            exercise.data = {
              reps: parseInt(event.target.value),
              weight: exercise.data?.weight || 0,
            };
            console.log('exercise', exercise);
            onChange(exercise);
          }}
          onBlur={() => handleSubmit()}
        />
      </div>
      <div>
        <input
          placeholder="weight"
          type="text"
          value={exercise.data?.weight}
          onChange={(event) => {
            exercise.data = {
              reps: exercise.data?.reps || 0,
              weight: parseInt(event.target.value),
            };
            onChange(exercise);
          }}
          onBlur={() => handleSubmit()}
        />
      </div>
    </div>
  );
};
