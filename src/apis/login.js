import axios from 'axios';

export const signInApi = async (data, type) => {
  if (type === 'Admin') {
    const response = await axios
      .post('http://localhost:8080/login/admin', data)
      .catch((error) => null);
  } else {
    // player login api 처리
    const response = await axios
      .post('http://localhost:8080/login/admin', data)
      .catch((error) => null);
  }
  if (!response) return null;

  const result = response.data;
  return result;
};
