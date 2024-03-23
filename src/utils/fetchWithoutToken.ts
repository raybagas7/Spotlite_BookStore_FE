export async function fetchWithoutToken<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ error: boolean; data: T | null; message: string }> {
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    console.log(responseData);

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
    console.log(error);

    return { error: true, data: null, message: 'Error Server' };
  }
}
