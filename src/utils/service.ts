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
          'Content-Type': 'application/json', // Specify the content type of the request body
        },
      }
    );
  };

  return {
    postSignup,
  };
})();

export default services;
