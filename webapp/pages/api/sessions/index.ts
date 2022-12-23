import initSupabase from "@/features/db/initSupabase";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateSessionOptions } from '@/features/exercise-recording/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = initSupabase();

  // Create a session
  if (req.method === "PUT") {
    const options: CreateSessionOptions = req.body;

    // create a new session
    const { data, error, statusText } = await supabase
      .from("sessions")
      .insert([{}])
      .select("*");

    if (options.sessionPlanId) {
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
      .select("id, start_time, is_active")
      .order("start_time", { ascending: true });

    res.status(200).json({ data, error });
  }
}
