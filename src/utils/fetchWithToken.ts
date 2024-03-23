import { getCookie } from 'cookies-next';

export async function fetchWithToken<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ error: boolean; data: T | null; message: string }> {
  const token = getCookie('token');

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const responseData = await response.json();

    if (!response.ok) {
      return { error: true, data: null, message: responseData.message };
    } else {
      return {
        error: false,
        data: responseData.data,
        message: responseData.message,
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return { error: true, data: null, message: 'Error Server' };
  }
}
