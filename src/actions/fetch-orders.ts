import { getCookie } from 'cookies-next';

export async function fetchOrders(page: number, size: number) {
  const url = `${process.env.BASE_API_URL}/api/orders?page=${page}&size=${size}`;
  const token = getCookie('token');

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();

    return data.data as Order[];
  } catch (error) {
    console.log(error);

    return null;
  }
}
