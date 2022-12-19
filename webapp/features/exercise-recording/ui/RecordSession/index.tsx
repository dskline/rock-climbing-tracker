import { NavBar } from "@/features/components/NavBar";
import {
  Exercise,
  ExerciseMetadata,
  ExerciseSet,
} from "@/features/exercise-recording/types";
import { useEffect, useState } from "react";
import { EndSessionButton } from "./EndSessionButton";
import { RecordExercise } from "@/features/exercise-recording/ui/RecordExercise";
import { runGetFetch } from "@/features/utilities/runFetch";
import { EXERCISES } from "@/features/exercise-recording/exercises/Exercises";

type Props = {
  sessionId: string;
};
export const RecordSession = ({ sessionId }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [exercisesAndSets, setExercisesAndSets] = useState(
    [] as Array<Exercise<any> | ExerciseSet>
  );

  useEffect(() => {
    if (sessionId) {
      runGetFetch<Array<Exercise<any> | ExerciseSet>>(
        `/api/sessions/${sessionId}/exercises`
      ).then((data) => {
        setExercisesAndSets(data);
        setIsLoading(false);
      });
    }
  }, [sessionId]);

  const handleAddExercise = (exercise: ExerciseMetadata) => {
    const newExercise: Exercise<any> = {
      type: exercise.id,
    };
    setExercisesAndSets([...exercisesAndSets, newExercise]);
  };

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
                onClick={() => handleAddExercise(exercise)}
              >
                <span className="pr-2">{exercise.icon}</span>
                {exercise.name}
              </button>
            );
          })}
        </div>
        {isLoading && <div>Loading exercises from existing session...</div>}
        {!isLoading &&
          exercisesAndSets.map((exerciseOrSet, index) => {
            const isExercise = !(exerciseOrSet instanceof Array);

            if (isExercise) {
              const exercise = exerciseOrSet as Exercise<any>;
              return (
                <div key={index} className="mt-4">
                  <RecordExercise
                    sessionId={sessionId}
                    exercise={exercise}
                    onChange={(updatedExercise) => {
                      console.log('updatedExercise', updatedExercise);
                      exercise.exercise_id = updatedExercise.exercise_id;
                      exercise.data = updatedExercise.data;
                      setExercisesAndSets([...exercisesAndSets]);
                    }}
                  />
                </div>
              );
            } else {
              const exerciseSet = exerciseOrSet as ExerciseSet;
              return <div key={index}>{exerciseSet.length}</div>;
            }
          })}
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
