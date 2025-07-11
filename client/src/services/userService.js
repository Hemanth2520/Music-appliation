import api from './api';

export const registerUser = async (data) => {
  // expects: { firstName, lastName, email, password, dateOfBirth }
  // backend expects: { username, email, password, phone }
  // We'll map firstName + lastName to username, and leave phone blank
  const payload = {
    username: `${data.firstName} ${data.lastName}`.trim(),
    email: data.email,
    password: data.password,
    phone: '',
  };
  return api.post('/auth/register', payload);
};

export const loginUser = async (data) => {
  // expects: { email, password }
  return api.post('/auth/login', data);
};
