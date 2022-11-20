import initSupabase from "../../../features/db/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = initSupabase();

  if (req.method === "PUT") {
    // create a new session
    const { data, error, statusText } = await supabase
      .from("sessions")
      .insert([{}])
      .select("*");

    res.status(200).json({ data, error, statusText });

  } else if (req.method === "GET") {
    // join the sessions and session_exercises tables
    const { data, error } = await supabase
      .from("session_exercises")
      .select("sessions(start_time), type, exercise_pushups(reps)")

    res.status(200).json({ data, error });
  }
}
