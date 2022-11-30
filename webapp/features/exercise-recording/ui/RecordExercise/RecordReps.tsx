
type Props = {
  sessionId: string;
}
export const RecordReps = (props: Props) => {
  const handleRecordReps = async () => {
    const repsInput = document.getElementById("repsInput") as HTMLInputElement;
    if (repsInput.value) {
      fetch(`/api/sessions/${props.sessionId}/exercises`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "PUSHUP",
          data: {
            reps: parseInt(repsInput.value),
          },
        }),
      });
    }
  };

  return (
    <div>
      <div>
        <label>How many reps did you do?</label>
      </div>
      <input id="repsInput" placeholder="# reps" type="text" />
      <button onClick={() => handleRecordReps()}>
        Submit
      </button>
    </div>
  );
};
