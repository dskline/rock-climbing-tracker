import { useEffect, useState } from "react";

import { StartSessionButton } from "./StartSessionButton";
import { Session } from "./types";
import { RecordReps } from "./RecordReps";
import { SessionsTable } from "./SessionsTable";
import { NavBar } from "../../../components/NavBar";


export const RecordExercise = () => {
  const [sessions, setSessions] = useState<Session[]>([] as Session[]);
  const [insertedSession, setInsertedSession] = useState<Session>();

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    const response = await fetch("/api/sessions");
    const json = await response.json();
    setSessions(json.data);
  };

  const handleCreateSession = (newSession: Session) => {
    setInsertedSession(newSession);
    setSessions([...sessions, newSession]);
  };

  return (
    <div>
      <NavBar />

      <StartSessionButton onSessionCreated={handleCreateSession} />
      <div>{insertedSession ? insertedSession.id : ""}</div>
      {insertedSession && <RecordReps sessionId={insertedSession.id} />}
      <br />
      <br />
      <SessionsTable sessions={sessions} />
    </div>
  );
};
