type Method = "GET" | "PUT" | "POST" | "DELETE";
type ReturnType<T> = {
  data: T;
}
export async function runFetch<T, U>(method: Method, endpoint: string, body?: U): Promise<T> {
  try {
    const response = await fetch(endpoint, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
    });
    const json: ReturnType<T> = await response.json();
    return json.data;
  } catch (e) {
    return Promise.reject(e);
  }
}
