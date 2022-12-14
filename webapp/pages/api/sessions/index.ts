import initSupabase from "@/features/db/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = initSupabase();

  if (req.method === "PUT") {
    let options;
    if (req.body) {
      options = JSON.parse(req.body);
    }

    // create a new session
    const { data, error, statusText } = await supabase
      .from("sessions")
      .insert([{}])
      .select("*");

    if (options?.sessionPlanId) {
      // Create blank exercise rows for each exercise in the session plan

      // 1 - Get the session plan from the database
      // 2 - Create an insert statement for each exercise in that plan
    }

    res.status(200).json({ data, error, statusText });

  } else if (req.method === "GET") {
    // get all sessions
    const { data, error } = await supabase
      .from("sessions")
      .select("start_time, session_exercises (type, data)");

    res.status(200).json({ data, error });

  }
}
