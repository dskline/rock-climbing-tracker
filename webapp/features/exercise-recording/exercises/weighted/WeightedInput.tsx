import { Exercise } from "@/features/exercise-recording/types";
import {
  WeightedExerciseData,
  WeightedExercises,
} from "@/features/exercise-recording/exercises/weighted/types";

type Props = {
  exercise: Exercise<keyof typeof WeightedExercises>;
  sessionId: string;
  onChange: (data: WeightedExerciseData) => void;
};
export const WeightedInput = ({ exercise, sessionId, onChange }: Props) => {
  const handleSubmit = async () => {
    if (exercise.data) {
      const { reps, weight } = exercise.data;
      if (reps && weight) {
        fetch(`/api/sessions/${sessionId}/exercises`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(exercise),
        });
      }
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="# reps"
          type="text"
          onChange={(event) => {
            onChange({
              reps: parseInt(event.target.value),
              weight: exercise.data?.weight || 0,
            });
          }}
          onBlur={() => handleSubmit()}
        />
      </div>
      <div>
        <input
          placeholder="weight"
          type="text"
          onChange={(event) => {
            onChange({
              reps: exercise.data?.reps || 0,
              weight: parseInt(event.target.value),
            });
          }}
          onBlur={() => handleSubmit()}
        />
      </div>
    </div>
  );
};
