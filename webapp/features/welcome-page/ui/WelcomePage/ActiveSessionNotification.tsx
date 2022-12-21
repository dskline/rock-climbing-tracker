import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";
import { Session } from "@/features/exercise-recording/types";
import { runDeleteFetch, runUpdateFetch } from "@/features/utilities/runFetch";

type Props = {
  activeSession: Session;
  onSessionEnd: () => void;
  onSessionDelete: () => void;
};
export const ActiveSessionNotification = ({
  activeSession,
  onSessionEnd,
  onSessionDelete,
}: Props) => {
  const handleEndSession = (session: Session) => {
    // Update the session in the database
    session.is_active = false;
    runUpdateFetch<Session>(`/api/sessions/${session.id}`, session);

    onSessionEnd();
  };

  const handleDeleteSession = (session: Session) => {
    // Delete the session in the database
    runDeleteFetch(`/api/sessions/${session.id}`);

    onSessionDelete();
  };

  return (
    <div className="flex items-center border-2 border-blue-700 bg-blue-50 rounded p-4 text-blue-900 text-sm">
      <div>
        <FaInfoCircle className="h-4 w-4 mr-2" />
      </div>
      <div>
        You have an existing{" "}
        <Link className="underline" href={`/session/${activeSession.id}`}>
          session
        </Link>{" "}
        from {new Date().toLocaleTimeString()}
        <div>
          <button onClick={() => handleEndSession(activeSession)}>
            End the session
          </button>
          <button
            className="border border-red-600 bg-red-200 text-red-900 rounded text-xs px-2 py-1"
            onClick={() => handleDeleteSession(activeSession)}
          >
            Delete the session
          </button>
        </div>
      </div>
    </div>
  );
};
