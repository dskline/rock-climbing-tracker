import { Session } from '@/features/exercise-recording/types';

export const createSession = async (): Promise<Session> => {
  try {
    const response = await fetch("/api/sessions", {
      method: "PUT",
    });
    const json = await response.json();
    return json.data[0];

  } catch (e) {
    return Promise.reject(e);
  }
};
