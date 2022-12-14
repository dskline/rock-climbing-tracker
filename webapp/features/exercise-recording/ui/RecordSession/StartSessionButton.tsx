import { createSession } from "@/features/exercise-recording/crud/client/createSession";
import { CreateSessionOptions, Session } from "@/features/exercise-recording/types";
import { useRouter } from "next/router";

type Props = {
  className?: string;
  children: React.ReactNode;
  options?: CreateSessionOptions;
}
export const StartSessionButton = (props: Props) => {
  const router = useRouter();

  const handleCreateSession = async () => {
    const newSession = await createSession(props.options);
    router.push(`/session/${newSession.id}`);
  };

  return (
    <button
      className={"border border-black rounded-lg " + props.className}
      onClick={() => handleCreateSession()}
    >
      {props.children}
    </button>
  );
};

