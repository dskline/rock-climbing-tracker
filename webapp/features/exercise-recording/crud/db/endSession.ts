import initSupabase from "@/features/db/initSupabase";

export async function endSession(sessionId: string) {
  const supabase = initSupabase();

  return await supabase
    .from("sessions")
    .update([
      {
        is_active: false,
      },
    ])
    .eq("id", sessionId);

  
}
