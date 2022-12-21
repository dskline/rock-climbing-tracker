import { NextApiRequest, NextApiResponse } from "next";
import { updateSession } from "@/features/exercise-recording/crud/updateSession";
import { Session } from "@/features/exercise-recording/types";
import { deleteSession } from '@/features/exercise-recording/crud/deleteSession'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = req.body as Session;

    // end active session
    await updateSession(session);
    res.status(200).json({});
  }
  else if (req.method === "DELETE") {
    const { sessionId } = req.query;

    await deleteSession(sessionId as string)
    res.status(200).json({});
  }
}
