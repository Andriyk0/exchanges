const API = 'https://api.exchangerate.host/latest';

export const getData = async () => {
  const response = await fetch(API);

  return response.json();
};
