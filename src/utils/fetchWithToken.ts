export async function fetchWithToken<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = 'your_token_here';

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
