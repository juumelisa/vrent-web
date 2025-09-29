export async function fetchWithToken(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = localStorage.getItem('token') || '';
  const headers = {
    ...options.headers,
    token,
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    ...options,
    headers,
  });
}
