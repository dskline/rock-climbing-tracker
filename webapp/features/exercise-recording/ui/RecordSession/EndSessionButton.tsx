import { Session } from "@/features/exercise-recording/types";
import { endSession } from "@/features/exercise-recording/crud/client/endSession";

type Props = {
  sessionId: string;
  onClick?: () => void;
};
export const EndSessionButton = (props: Props) => {
  const handleEndSession = async () => {
    await endSession(props.sessionId);
    props.onClick?.();
  };

  return (
    <button
      className="mx-12 border border-black rounded-md bg-blue-300 hover:bg-blue-500"
      onClick={() => handleEndSession()}
    >
      End Session
    </button>
  );
};
