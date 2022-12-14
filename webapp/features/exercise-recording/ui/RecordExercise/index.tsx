import { NavBar } from "@/features/components/NavBar";
import { EXERCISES } from "@/features/exercise-recording/ui/RecordExercise/Exercises";
import { RecordReps } from "./RecordReps";
import { Exercise } from "@/features/exercise-recording/types";
import { useState } from "react";
import { EndSessionButton } from "../RecordSession/EndSessionButton";
import { useRouter } from "next/router";

type Props = {
  sessionId: string;
};
export const RecordExercise = ({ sessionId }: Props) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise<any>>();

  const router = useRouter();

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
            {selectedExercise.type === "ExerciseWithReps" && (
              <RecordReps sessionId={sessionId} />
            )}
          </div>
        )}
      </div>
      <EndSessionButton
        sessionId={sessionId}
        // onClick={() => {
        //   console.log("complete");
        // }}
      />
    </div>
  );
};

