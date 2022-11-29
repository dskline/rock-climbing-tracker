import { NextApiRequest, NextApiResponse } from "next";
import { createPushupExercise } from "../../../../../features/core/crud/createExercise";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    // todo: insert an exercise
    const { sessionId } = req.query;

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
  }
}
