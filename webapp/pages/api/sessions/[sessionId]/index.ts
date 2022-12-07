import { NextApiRequest, NextApiResponse } from "next";
import { createPushupExercise } from "@/features/exercise-recording/crud/db/createExercise";
import { endSession } from "@/features/exercise-recording/crud/db/endSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;
  
  if (req.method === "POST") {
    // end active session
    endSession(sessionId as string);
  }
}
