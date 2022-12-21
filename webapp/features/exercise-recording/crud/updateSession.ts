import initSupabase from "@/features/db/initSupabase";
import { Session } from "../types";

export async function updateSession(session: Session) {
  const supabase = initSupabase();

  return supabase.from("sessions").update(session).eq("id", session.id);
}
