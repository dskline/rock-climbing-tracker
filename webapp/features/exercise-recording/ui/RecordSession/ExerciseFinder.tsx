import { EXERCISES } from "@/features/exercise-recording/exercises/Exercises";
import { ExerciseMetadata } from "@/features/exercise-recording/types";

type Props = {
  onExerciseSelected: (exerciseMetadata: ExerciseMetadata) => void;
};
export const ExerciseFinder = ({ onExerciseSelected }: Props) => {
  return (
    <div className="grid gap-4 grid-cols-3 md:grid-cols-6 w-full my-2">
      {Object.values(EXERCISES).map((exercise) => {
        return (
          <button
            key={exercise.name}
            title={exercise.description}
            className="h-12 bg-blue-100 rounded-lg border border-blue-800 text-blue-900 font-semibold shadow-lg"
            onClick={() => onExerciseSelected(exercise)}
          >
            <span className="pr-2">{exercise.icon}</span>
            {exercise.name}
          </button>
        );
      })}
    </div>
  );
};
