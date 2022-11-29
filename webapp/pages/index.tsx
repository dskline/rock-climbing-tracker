import { useEffect, useState } from "react";

const EXERCISES = {
  PUSHUP: {},
  TENNIS_SERVE: {},
};
type ExerciseWithReps = {
  reps: number;
};
type Exercise = {
  type: keyof typeof EXERCISES;
  data: ExerciseWithReps;
};

type Session = {
  start_time: string;
  session_exercises: Array<Exercise>;
};
type InsertedSession = {
  id: string;
  start_time: string;
  end_time: string;
};

export default function Home() {
  const [sessions, setSessions] = useState<Session[]>([] as Session[]);
  const [insertedSession, setInsertedSession] = useState<InsertedSession>();

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    const response = await fetch("/api/sessions");
    const json = await response.json();
    setSessions(json.data);
  };

  const handleCreateSession = async () => {
    try {
      const response = await fetch("/api/sessions", {
        method: "PUT",
      });
      const json = await response.json();

      setInsertedSession(json.data[0]);
      setSessions([
        ...sessions,
        {
          start_time: json.data[0].start_time,
          session_exercises: [],
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button onClick={() => handleCreateSession()}>Start a new session</button>
      <div>{insertedSession ? insertedSession.id : ""}</div>
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
            fetch(`/api/sessions/${insertedSession?.id}/exercises`, {
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
        }}
      >
        Submit
      </button>
      <br />
      <br />
      <div>
        {!sessions && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {sessions && (
          <table>
            <thead>
              <tr>
                <th>Session Date</th>
                <th>Total Reps</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.start_time}>
                  <td>{session.start_time}</td>
                  <td>
                    {session.session_exercises
                      ? calculateTotalReps(session.session_exercises)
                      : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function calculateTotalReps(exercises: Array<Exercise>) {
  let total = 0;
  for (const exercise of exercises) {
    if (exercise.data.reps) {
      total += exercise.data.reps;
    }
  }
  return total;
}
