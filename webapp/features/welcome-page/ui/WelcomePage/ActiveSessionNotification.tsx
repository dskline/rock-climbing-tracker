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

  const sessionStartTime = new Date(activeSession.start_time);
  const formattedTime = `${sessionStartTime.toLocaleDateString()} ${sessionStartTime.toLocaleTimeString()}`;

  return (
    <div className="inline-flex flex-col border-2 border-blue-700 bg-blue-50 rounded p-4 pr-8 text-blue-900 text-sm">
      <div className="inline-flex items-center">
        <div>
          <FaInfoCircle className="h-4 w-4 mr-2" />
        </div>
        <div>
          You have an existing{" "}
          <Link className="underline" href={`/session/${activeSession.id}`}>
            session
          </Link>{" "}
          from {formattedTime}
        </div>
      </div>
      <div className="pt-2 flex justify-end text-xs gap-3">
        <button
          className="text-red-700"
          onClick={() => handleDeleteSession(activeSession)}
        >
          Delete the session
        </button>
        <button className="px-3 py-2 bg-blue-200 rounded" onClick={() => handleEndSession(activeSession)}>
          End the session
        </button>
      </div>
    </div>
  );
};
