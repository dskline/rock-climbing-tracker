import initSupabase from "@/features/db/initSupabase";

export async function deleteSession(sessionId: string) {
  const supabase = initSupabase();

  return supabase.from("sessions").delete().eq("id", sessionId);
}
