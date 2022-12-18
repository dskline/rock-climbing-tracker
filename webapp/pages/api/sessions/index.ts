import initSupabase from "@/features/db/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = initSupabase();

  // Create a session
  if (req.method === "PUT") {
    // create a new session
    const { data, error, statusText } = await supabase
      .from("sessions")
      .insert([{}])
      .select("*");

    if (req.body?.sessionPlanId) {
      // Create blank exercise rows for each exercise in the session plan
      // 1 - Get the session plan from the database
      // 2 - Create an insert statement for each exercise in that plan
    }

    if (data) {
      res.status(200).json({ data: data[0], statusText });
    } else {
      res.status(500).json({ error, statusText });
    }
  }
  // get all sessions
  else if (req.method === "GET") {
    const { data, error } = await supabase
      .from("sessions")
      .select("start_time, session_exercises (type, data)");

    res.status(200).json({ data, error });
  }
}
