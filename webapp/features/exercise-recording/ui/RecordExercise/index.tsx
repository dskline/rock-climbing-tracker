import { useEffect, useState } from "react";

import { StartSessionButton } from "./StartSessionButton";
import { Session } from "./types";
import { RecordReps } from "./RecordReps";
import { SessionsTable } from "./SessionsTable";
import { NavBar } from "../../../components/NavBar";
import { useRouter } from "next/router";

export const RecordExercise = () => {
  const [sessions, setSessions] = useState<Session[]>([] as Session[]);
  const [insertedSession, setInsertedSession] = useState<Session>();

  const router = useRouter();

  useEffect(() => {
    fetchSessionData();
  }, []);

  const fetchSessionData = async () => {
    const response = await fetch("/api/sessions");
    const json = await response.json();
    setSessions(json.data);
  };

  const handleCreateSession = (newSession: Session) => {
    router.push(`/session/${newSession.id}`);
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
