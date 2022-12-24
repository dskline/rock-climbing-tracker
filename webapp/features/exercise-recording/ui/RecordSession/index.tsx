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
import { ExerciseFinder } from "@/features/exercise-recording/ui/RecordSession/ExerciseFinder";

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
      runGetFetch<Array<Exercise<any>>>(
        `/api/sessions/${sessionId}/exercises`
      ).then((data) => {
        console.log("data", data);
        const exercisesAndSets = [];
        let currentSet: Exercise<any>[] = [];
        let currentSetNumber;

        for (let i = 0; i < data.length; i++) {
          console.log("currentSetNumber", i, currentSetNumber);
          console.log("currentSet", currentSet);
          if (!currentSetNumber) {
            currentSet.push(data[i]);
            currentSetNumber = data[i].set_number;
          } else {
            if (currentSetNumber !== data[i].set_number) {
              // we're on a new set
              if (currentSet.length > 1) {
                exercisesAndSets.push(currentSet);
              } else if (currentSet.length === 1) {
                exercisesAndSets.push(currentSet[0]);
              }
              currentSet = [data[i]];
              currentSetNumber = data[i].set_number;
              console.log("exerciseAndSets", exercisesAndSets);
            } else {
              // continue the current set
              console.log("found a duplicate set number");
            }
          }
        }
        if (currentSet.length > 1) {
          exercisesAndSets.push(currentSet);
        } else if (currentSet.length === 1) {
          exercisesAndSets.push(currentSet[0]);
        }

        setExercisesAndSets(exercisesAndSets);
        setIsLoading(false);
      });
    }
  }, [sessionId]);

  const handleAddIndividualExercise = (exercise: ExerciseMetadata) => {
    const newExercise: Exercise<any> = {
      type: exercise.id,
      set_number: exercisesAndSets.length,
    };
    setExercisesAndSets([...exercisesAndSets, newExercise]);
  };

  const insertExerciseIntoSet = (
    exercise: ExerciseMetadata,
    setNumber: number
  ) => {
    console.log("setNumber", setNumber);
    const newExercise: Exercise<any> = {
      type: exercise.id,
      set_number: setNumber,
    };
    (exercisesAndSets[setNumber] as ExerciseSet).push(newExercise);

    setExercisesAndSets([...exercisesAndSets]);
  };

  const handleCreateSet = () => {
    setExercisesAndSets([...exercisesAndSets, [] as ExerciseSet]);
  };

  return (
    <div>
      <NavBar />
      <div className="p-8">
        <div>Select an exercise:</div>
        <button onClick={() => handleCreateSet()}>Create a new set</button>
        <ExerciseFinder onExerciseSelected={handleAddIndividualExercise} />
        {isLoading && <div>Loading exercises from existing session...</div>}
        <div className="flex flex-col gap-4 mt-4">
          {!isLoading &&
            exercisesAndSets.map((exerciseOrSet, index) => {
              const isExercise = !(exerciseOrSet instanceof Array);

              if (isExercise) {
                const exercise = exerciseOrSet as Exercise<any>;
                return (
                  <div key={index}>
                    <RecordExercise
                      sessionId={sessionId}
                      exercise={exercise}
                      onChange={(updatedExercise) => {
                        exercise.exercise_id = updatedExercise.exercise_id;
                        exercise.data = updatedExercise.data;
                        setExercisesAndSets([...exercisesAndSets]);
                      }}
                    />
                  </div>
                );
              } else {
                const exerciseSet = exerciseOrSet as ExerciseSet;

                return (
                  <div key={index} className="bg-purple-300 p-6">
                    {exerciseSet.map((exercise, index) => (
                      <div key={index} className="mt-4">
                        <RecordExercise
                          sessionId={sessionId}
                          exercise={exercise}
                          onChange={(updatedExercise) => {
                            exercise.exercise_id = updatedExercise.exercise_id;
                            exercise.data = updatedExercise.data;
                            setExercisesAndSets([...exercisesAndSets]);
                          }}
                        />
                      </div>
                    ))}
                    <ExerciseFinder
                      onExerciseSelected={(exerciseMetadata) =>
                        insertExerciseIntoSet(
                          exerciseMetadata,
                          exerciseSet.length
                            ? exerciseSet[0].set_number
                            : getNextSetNumber(exercisesAndSets)
                        )
                      }
                    />
                  </div>
                );
              }
            })}
        </div>
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

function getExerciseSetNumber(exerciseOrSet: Exercise<any> | ExerciseSet) {
  if (exerciseOrSet instanceof Array) {
    return exerciseOrSet.length ? exerciseOrSet[0].set_number : null;
  } else {
    return exerciseOrSet.set_number;
  }
}

function getNextSetNumber(
  exercisesAndSets: Array<Exercise<any> | ExerciseSet>
) {
  let i = exercisesAndSets.length - 1;
  while (i >= 0) {
    let setNumber = getExerciseSetNumber(exercisesAndSets[i]);
    console.log("1", setNumber);
    if (setNumber !== null) {
      return setNumber + 1;
    }
    i--;
  }
  return exercisesAndSets.length;
}
