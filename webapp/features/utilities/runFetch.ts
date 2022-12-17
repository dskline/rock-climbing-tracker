type Method = "GET" | "PUT" | "POST" | "DELETE";
type ReturnType<T> = {
  data: T;
}
export async function runFetch<T, U = T>(method: Method, endpoint: string, body?: T): Promise<U> {
  try {
    const response = await fetch(endpoint, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
      }
    });
    const json: ReturnType<U> = await response.json();
    return json.data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function runGetFetch<T>(endpoint: string): Promise<T> {
  return runFetch<void, T>("GET", endpoint);
}

export async function runUpdateFetch<T>(endpoint: string, body: T): Promise<T> {
  return runFetch<T, T>("POST", endpoint, body);
}

export async function runDeleteFetch(endpoint: string) {
  return runFetch("DELETE", endpoint);
}
