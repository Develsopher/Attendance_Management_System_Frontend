import axios from 'axios';

export const signInApi = async (data) => {
  const response = await axios
    .post('http://localhost:8080/login/admin', data)
    .catch((error) => null);
  if (!response) return null;

  const result = response.data;
  return result;
};
