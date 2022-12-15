import {
  BodyWeightExerciseData,
  BodyweightExercises,
} from "@/features/exercise-recording/exercises/bodyweight/types";
import { BodyWeightInput } from "@/features/exercise-recording/exercises/bodyweight/BodyWeightInput";
import { WeightedExercises } from "@/features/exercise-recording/exercises/weighted/types";
import { WeightedInput } from "@/features/exercise-recording/exercises/weighted/WeightedInput";
import {
  Exercise,
  ExerciseMetadata,
} from "@/features/exercise-recording/types";
import { EXERCISES } from "@/features/exercise-recording/ui/RecordExercise/Exercises";

type Props = {
  sessionId: string;
  exercise: Exercise<any>;
  onChange: (data: Exercise<any>["data"]) => void;
};
export const RecordExercise = ({ sessionId, exercise, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-2 border-2 border-blue-800 rounded-lg shadow">
      <div className="italic text-sm text-blue-800">
        {EXERCISES[exercise.type].name}
      </div>
      {BodyweightExercises.hasOwnProperty(exercise.type) && (
        <BodyWeightInput
          exercise={exercise}
          sessionId={sessionId}
          onChange={onChange}
        />
      )}
      {WeightedExercises.hasOwnProperty(exercise.type) && (
        <WeightedInput
          exercise={exercise}
          sessionId={sessionId}
          onChange={onChange}
        />
      )}
    </div>
  );
};
