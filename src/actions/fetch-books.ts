export async function fetchBooks(page: number, size: number) {
  const url = `${process.env.BASE_API_URL}/api/books?page=${page}&size=${size}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    return data.data as Book[];
  } catch (error) {
    console.log(error);

    return null;
  }
}
