import { createSession } from "@/features/exercise-recording/crud/client/createSession";
import { Session } from "@/features/exercise-recording/types";

type Props = {
  onSessionCreated: (newSession: Session) => void;
};
export const StartSessionButton = (props: Props) => {
  const handleCreateSession = async () => {
    const newSession = await createSession();
    props.onSessionCreated(newSession);
  };

  return (
    <button onClick={() => handleCreateSession()}>Start a new session</button>
  );
};

