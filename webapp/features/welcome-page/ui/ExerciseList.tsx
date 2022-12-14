import { StartSessionButton } from "@/features/exercise-recording/ui/RecordSession/StartSessionButton";
import Link from "next/link";
import { Session } from "@/features/exercise-recording/types";

type ExerciseData = {
  name: string;
  id: string;
};

export const ExerciseList = () => {
  // add a useEffect to fetch a list of session plans

  return (
    <div className="flex flex-col gap-4 p-8 items-center">
      <div>Exercise List</div>
      {/* TODO: fetch a list of session plans and map them to buttons */}
      <StartSessionButton
        className="w-3/4 py-3"
        options={{ sessionPlanId: "asdfg" }}
      >
        Exercise 1
      </StartSessionButton>
      <StartSessionButton className="w-3/4 py-3">
        Exercise Plan 2
      </StartSessionButton>
      <StartSessionButton className="w-3/4 py-3">
        Exercise Plan 3
      </StartSessionButton>
    </div>
  );
};
