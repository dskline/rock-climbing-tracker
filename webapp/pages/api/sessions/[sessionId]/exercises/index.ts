import { NextApiRequest, NextApiResponse } from "next";
import { createPushupExercise } from "@/features/exercise-recording/crud/db/createExercise";
import { endSession } from "@/features/exercise-recording/crud/db/endSession";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;
  if (req.method === "PUT") {
    // todo: insert an exercise

    if (req.body.type === "PUSHUP") {
      const { error } = await createPushupExercise(
        sessionId as string,
        req.body.data.reps
      );

      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ error });
    }
  } else if (req.method === "GET") {
    // todo: get all exercises
    // get the sessionId from the URL
    // supabase query
  } else if (req.method === "POST") {
    // end active session
    endSession(sessionId as string);
  }
}
