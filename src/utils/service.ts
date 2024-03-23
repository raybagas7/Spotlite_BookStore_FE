import { fetchWithoutToken } from './fetchWithoutToken';
import { fetchWithToken } from './fetchWithToken';

const services = (() => {
  const postSignup = async (payload: SignUpPayload) => {
    return fetchWithoutToken<SignupResponse>(
      `${process.env.BASE_API_URL}/auth/signup`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const postLogin = async (payload: LoginUpPayload) => {
    return fetchWithoutToken<LoginResponse>(
      `${process.env.BASE_API_URL}/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const getUserData = async () => {
    return fetchWithToken<IUserData>(
      `${process.env.BASE_API_URL}/auth/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const postOrderBook = async (payload: OrderPayload) => {
    return fetchWithToken<SuccessOrderResponse>(
      `${process.env.BASE_API_URL}/api/orders`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const deleteOrderBook = async (payload: string) => {
    return fetchWithToken<SuccessOrderResponse>(
      `${process.env.BASE_API_URL}/api/orders/${payload}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const getTags = async () => {
    return fetchWithoutToken<Tag[]>(`${process.env.BASE_API_URL}/api/tags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const postNewBook = async (payload: NewBookPayload) => {
    return fetchWithToken<SuccessAddNewBookResponse>(
      `${process.env.BASE_API_URL}/api/books`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const postNewTag = async (payload: NewTagPayload) => {
    return fetchWithToken<Tag>(`${process.env.BASE_API_URL}/api/tags`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return {
    postSignup,
    getUserData,
    postLogin,
    postOrderBook,
    deleteOrderBook,
    getTags,
    postNewBook,
    postNewTag,
  };
})();

export default services;
