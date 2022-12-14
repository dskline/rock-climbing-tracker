import { useEffect, useState } from "react";

import { StartSessionButton } from "./StartSessionButton";
import { Session } from "@/features/exercise-recording/types";
import { SessionsTable } from "@/features/exercise-visualization/ui/SessionsTable";
import { NavBar } from "@/features/components/NavBar";
import { useRouter } from "next/router";
import { BodyWeightInput } from '@/features/exercise-recording/exercises/bodyweight/BodyWeightInput'

export const RecordSession = () => {
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

      <StartSessionButton>Start a new session</StartSessionButton>

      <div>{insertedSession ? insertedSession.id : ""}</div>
      {insertedSession && <BodyWeightInput type="PUSHUP" sessionId={insertedSession.id} />}
      <br />
      <br />
      <SessionsTable sessions={sessions} />
    </div>
  );
};
