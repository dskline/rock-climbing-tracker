import { createSession } from "./createSession";
import { Session } from "./types";

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
