import { ExerciseCategory } from '@/features/exercise-recording/types'

type Props = {
  type: ExerciseCategory;
  sessionId: string;
}
export const WeightedInput = (props: Props) => {

  const handleSubmit = async () => {
    const repsInput = document.getElementById("repsInput") as HTMLInputElement;
    const weightInput = document.getElementById("weightInput") as HTMLInputElement;
    if (repsInput.value) {
      fetch(`/api/sessions/${props.sessionId}/exercises`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: props.type,
          data: {
            reps: parseInt(repsInput.value),
            weight: parseFloat(weightInput.value),
          },
        }),
      });
    }
  };

  return (
    <div>
      <div>
        <label>How many reps did you do?</label>
        <input id="repsInput" placeholder="# reps" type="text" />
      </div>
      <div>
        <label>How much weight did you use?</label>
        <input id="weightInput" placeholder="weight" type="text" />
      </div>
      <button onClick={() => handleSubmit()}>
        Submit
      </button>
    </div>
  );
};
