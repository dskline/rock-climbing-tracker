import initSupabase from "@/features/db/initSupabase";

export async function endSession(sessionId: string) {
  try {
    return await fetch(`/api/sessions/${sessionId}`, {
      method: "POST",
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
