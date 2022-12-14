import { CreateSessionOptions, Session } from '@/features/exercise-recording/types';

export const createSession = async (options?: CreateSessionOptions): Promise<Session> => {
  try {
    const response = await fetch("/api/sessions", {
      method: "PUT",
      body: options ? JSON.stringify(options) : undefined,
    });
    const json = await response.json();
    return json.data[0];

  } catch (e) {
    return Promise.reject(e);
  }
};
