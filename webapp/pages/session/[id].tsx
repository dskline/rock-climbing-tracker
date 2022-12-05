import { useState } from "react";
import { useRouter } from "next/router";

import { NavBar } from "../../features/components/NavBar";
import { EXERCISES } from "../../features/exercise-recording/ui/RecordExercise/Exercises";
import { Exercise } from "../../features/exercise-recording/ui/RecordExercise/types";
import { RecordReps } from "../../features/exercise-recording/ui/RecordExercise/RecordReps";

export default function SessionPage() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const router = useRouter();
  const sessionId = router.query.id as string;

  return (
    <div>
      <NavBar />
      <div className="p-8">
        <div>Select an exercise:</div>
        <div className="grid gap-4 grid-cols-6 w-full my-2">
          {Object.values(EXERCISES).map((exercise) => {
            return (
              <button
                key={exercise.name}
                title={exercise.description}
                className="h-12 bg-blue-100 rounded-lg border border-blue-800 text-blue-900 font-semibold shadow-lg"
                onClick={() => setSelectedExercise(exercise)}
              >
                <span className="pr-2">{exercise.icon}</span>
                {exercise.name}
              </button>
            );
          })}
        </div>
        {selectedExercise && (
          <div className="mt-4">
            {selectedExercise.dataType === "ExerciseWithReps" && (
              <RecordReps sessionId={sessionId} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
