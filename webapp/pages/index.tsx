export default function Home() {

  return (
    <div>
      <div>
        <label>How many reps did you do?</label>
      </div>
      <input id="repsInput" placeholder="# reps" type="text" />
      <button
        onClick={() => {
          const repsInput = document.getElementById("repsInput") as HTMLInputElement;
          if (repsInput.value) {
            alert("You did " + repsInput.value + " reps!");
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}
