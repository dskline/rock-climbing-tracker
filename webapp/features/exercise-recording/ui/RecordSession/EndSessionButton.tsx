import { Session } from "@/features/exercise-recording/types";
import { endSession } from "@/features/exercise-recording/crud/client/endSession";

type Props = {
  sessionId: string
  onClick?: () => void;
};
export const EndSessionButton = (props: Props) => {
  const handleEndSession = async () => {
    await endSession(props.sessionId);
    props.onClick?.();
  };

  return (
    <button onClick={() => handleEndSession()}>End Session</button>
  );
};
