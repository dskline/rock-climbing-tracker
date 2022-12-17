import { NextApiRequest, NextApiResponse } from "next";
import { createExercise } from "@/features/exercise-recording/crud/createExercise";
import { getExercises } from "@/features/exercise-recording/crud/getExercises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;
  const body = req.body;

  if (req.method === "PUT") {
    const { data, error } = await createExercise({
      type: body.type,
      sessionId: sessionId as string,
      data: body.data,
    });

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ data, error });
  }
  // Get all exercises for a session
  else if (req.method === "GET") {
    const data = await getExercises(sessionId as string);
    return res.status(200).json(data);
  }
}
