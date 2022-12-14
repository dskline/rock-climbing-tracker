import { NextApiRequest, NextApiResponse } from "next";
import { endSession } from "@/features/exercise-recording/crud/db/endSession";
import { createExercise } from "@/features/exercise-recording/crud/db/createExercise";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;
  const body = req.body;

  if (req.method === "PUT") {
    const { error } = await createExercise({
      type: body.type,
      sessionId: sessionId as string,
      data: body.data,
    });

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ error });
  } else if (req.method === "GET") {
    // todo: get all exercises
    // get the sessionId from the URL
    // supabase query
  } else if (req.method === "POST") {
    // end active session
    endSession(sessionId as string);
  }
}
