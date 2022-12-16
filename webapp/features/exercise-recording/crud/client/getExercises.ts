import initSupabase from "@/features/db/initSupabase";

export async function getExercises(sessionId: string) {
    try {
        const response = await fetch(`/api/sessions/${sessionId}/exercises`, {
            method: "GET",
        });
        const json = await response.json();
        return json.data;
    } catch (e) {
        return Promise.reject(e);
    }
}
