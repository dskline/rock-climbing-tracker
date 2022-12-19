import { updateExercise } from "@/features/exercise-recording/crud/updateExercise";
import { Exercise } from "@/features/exercise-recording/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await updateExercise(req.body);
    return res.status(200).json({ statusText: "Success!" });
  }
}
