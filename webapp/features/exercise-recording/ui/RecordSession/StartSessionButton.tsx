import {
  CreateSessionOptions,
  Session,
} from "@/features/exercise-recording/types";
import { useRouter } from "next/router";
import { runFetch } from "@/features/utilities/runFetch";

type Props = {
  className?: string;
  children: React.ReactNode;
  options?: CreateSessionOptions;
};
export const StartSessionButton = (props: Props) => {
  const router = useRouter();

  const handleCreateSession = async () => {
    const newSession = await runFetch<CreateSessionOptions, Session>(
      "PUT",
      "/api/sessions",
      props.options
    );
    router.push(`/session/${newSession.id}`);
  };

  return (
    <button
      className={
        "border border-black bg-blue-300 hover:bg-blue-500 rounded-lg w-1/2" +
        props.className
      }
      onClick={() => handleCreateSession()}
    >
      {props.children}
    </button>
  );
};
