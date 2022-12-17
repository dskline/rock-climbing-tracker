import { NextApiRequest } from "next";
import { endSession } from "@/features/exercise-recording/crud/endSession";

export default async function handler(req: NextApiRequest) {
  const { sessionId } = req.query;

  if (req.method === "POST") {
    // end active session
    endSession(sessionId as string);
  }
}
