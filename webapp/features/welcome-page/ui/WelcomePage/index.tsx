import { NavBar } from "@/features/components/NavBar";
import { Calendar } from "@/features/welcome-page/calendar/ui/Calendar";
import { ExerciseList } from "@/features/welcome-page/ui/ExerciseList";
import { useEffect, useState } from "react";
import { Session } from "@/features/exercise-recording/types";
import { runGetFetch } from "@/features/utilities/runFetch";
import { ActiveSessionNotification } from "@/features/welcome-page/ui/WelcomePage/ActiveSessionNotification";

export const WelcomePage = () => {
  const [sessions, setSessions] = useState([] as Session[]);

  useEffect(() => {
    runGetFetch<Array<Session>>("/api/sessions").then((data) => {
      setSessions(data);
    });
  }, []);

  const activeSession = sessions.find((item) => item.is_active);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-col gap-4 p-4">
        {activeSession && (
          <div>
            <ActiveSessionNotification
              activeSession={activeSession}
              onSessionEnd={() => {
                // Update the sessions state
                const foundSession = sessions.find(
                  (item) => item.id === activeSession.id
                );
                if (foundSession) {
                  foundSession.is_active = false;
                  setSessions([...sessions]);
                }
              }}
              onSessionDelete={() => {
                // Update the sessions state
                const sessionIndex = sessions.findIndex(
                  (item) => item.id === activeSession.id
                );
                if (sessionIndex >= 0) {
                  sessions.splice(sessionIndex, 1);
                  setSessions([...sessions]);
                }
              }}
            />
          </div>
        )}
        <div className="w-1/2">
          <ExerciseList />
        </div>
        <div className="w-1/2">
          <Calendar />
        </div>
      </div>
    </div>
  );
};
