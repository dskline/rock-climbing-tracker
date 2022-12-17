import { Exercise } from "@/features/exercise-recording/types";
import { BodyweightExercises } from "@/features/exercise-recording/exercises/bodyweight/types";
import { runFetch, runUpdateFetch } from "@/features/utilities/runFetch";

type Props = {
  exercise: Exercise<keyof typeof BodyweightExercises>;
  sessionId: string;
  onChange: (exercise: Exercise<keyof typeof BodyweightExercises>) => void;
};
export const BodyWeightInput = ({ exercise, sessionId, onChange }: Props) => {
  const handleUpsert = async () => {
    if (exercise.data?.reps) {
      if (!exercise.exercise_id) {
        // Create a new exercise
        const newExercise = await runFetch(
          "PUT",
          `/api/sessions/${sessionId}/exercises`,
          exercise
        );
        onChange(newExercise);
      } else {
        await runUpdateFetch(
          `/api/exercises/${exercise.exercise_id}`,
          exercise
        );
      }
    }
  };

  return (
    <div>
      <input
        placeholder="# reps"
        type="text"
        value={exercise.data?.reps}
        onChange={(event) => {
          exercise.data = {
            ...exercise.data,
            reps: parseInt(event.target.value),
          };
          onChange(exercise);
        }}
        onBlur={() => handleUpsert()}
      />
    </div>
  );
};
