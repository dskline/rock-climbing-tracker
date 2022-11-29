import { useEffect, useState } from "react";

type SessionExercise = {
  random: string
  type: "PUSHUP";
  sessions: {
    start_time: string;
  };
  exercise_pushups: Array<{
    reps: number;
  }>;
};

export default function Home() {
  const [sessionExercises, setSessionExercises] = useState<SessionExercise[]>();

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    const response = await fetch("/api/sessions");
    const json = await response.json();
    setSessionExercises(json.data);
  };

  return (
    <div>
      <div>
        <h1>some change</h1>
      </div>
      <div>
        <label>How many reps did you do?</label>
      </div>
      <input id="repsInput" placeholder="# reps" type="text" />
      <button
        onClick={() => {
          const repsInput = document.getElementById(
            "repsInput"
          ) as HTMLInputElement;
          if (repsInput.value) {
            alert("You did " + repsInput.value + " reps!");
          }
        }}
      >
        Submit
      </button>
      <br />
      <br />
      <div>
        {!sessionExercises && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {sessionExercises && (
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {sessionExercises.map((sessionExercise) => (
                <tr key={sessionExercise.sessions.start_time}>
                  <td>{sessionExercise.sessions.start_time}</td>
                  <td>{sessionExercise.exercise_pushups[0].reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
