import initSupabase from "@/features/db/initSupabase";
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
    // get all sessions
    const { data, error, statusText } = await supabase
      .from("sessions")
      .select("start_time, session_exercises (type, data)");

    res.status(200).json({ data, error });

  } 
}
