import { useRouter } from "next/router";
import { RecordSession } from "@/features/exercise-recording/ui/RecordSession";

export default function SessionPage() {
  const router = useRouter();
  const sessionId = router.query.id as string;

  return <RecordSession sessionId={sessionId} />;
}
