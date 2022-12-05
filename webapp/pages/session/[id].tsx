import { useRouter } from "next/router";
import { RecordExercise } from "@/features/exercise-recording/ui/RecordExercise";

export default function SessionPage() {
  const router = useRouter();
  const sessionId = router.query.id as string;

  return <RecordExercise sessionId={sessionId} />;
}
