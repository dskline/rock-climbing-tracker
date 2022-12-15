import { Exercise } from "@/features/exercise-recording/types";
import {
  BodyWeightExerciseData,
  BodyweightExercises,
} from "@/features/exercise-recording/exercises/bodyweight/types";

type Props = {
  exercise: Exercise<keyof typeof BodyweightExercises>;
  sessionId: string;
  onChange: (data: BodyWeightExerciseData) => void;
};
export const BodyWeightInput = ({ exercise, sessionId, onChange }: Props) => {
  const handleUpsert = async () => {
    if (exercise.data?.reps) {
      fetch(`/api/sessions/${sessionId}/exercises`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
      });
    }
  };

  return (
    <div>
      <input
        placeholder="# reps"
        type="text"
        onChange={(event) => {
          onChange({
            ...exercise.data,
            reps: parseInt(event.target.value),
          });
        }}
        onBlur={() => handleUpsert()}
      />
    </div>
  );
};
