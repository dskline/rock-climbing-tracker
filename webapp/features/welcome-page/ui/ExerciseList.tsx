import { StartSessionButton } from "@/features/exercise-recording/ui/RecordSession/StartSessionButton";
import { CreateSessionOptions } from "@/features/exercise-recording/types";

export const ExerciseList = () => {
  // add a useEffect to fetch a list of session plans

  return (
    <div className="flex flex-col gap-4">
      <div>Start a new session from an exercise plan:</div>
      <div className="flex flex-col gap-4 items-center max-h-64 overflow-y-scroll">
        {/* TODO: fetch a list of session plans and map them to buttons */}
        <ExercisePlanButton
          name="Exercise 1"
          options={{ sessionPlanId: "asdfg" }}
        />
        <ExercisePlanButton
          name="Exercise Plan 2"
          options={{ sessionPlanId: "asdfg" }}
        />
        <ExercisePlanButton
          name="Exercise Plan 3"
          options={{ sessionPlanId: "asdfg" }}
        />
        <ExercisePlanButton
          name="Exercise Plan 3"
          options={{ sessionPlanId: "asdfg" }}
        />
        <ExercisePlanButton
          name="Exercise Plan 3"
          options={{ sessionPlanId: "asdfg" }}
        />
        <ExercisePlanButton
          name="Exercise Plan 3"
          options={{ sessionPlanId: "asdfg" }}
        />
      </div>
    </div>
  );
};

type ButtonProps = {
  name: string;
  options?: CreateSessionOptions;
};
const ExercisePlanButton = (props: ButtonProps) => {
  return (
    <StartSessionButton className="w-1/2 py-2" options={props.options}>
      {props.name}
    </StartSessionButton>
  );
};
