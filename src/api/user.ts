import instance from '../utils/request';

export const getUsers = () => {
  return instance.get('/api/user/list');
};

export const getUser = (_id: string) => {
  return instance.get('/api/user/detail', { params: { _id } });
};

export const deleteUser = (_id: string) => {
  return instance.post('/api/user/delete', {
    _id
  });
};

export const addUser = (username: string, phone: string, email: string, password: string) => {
  return instance.post('/api/user/register', {
    username,
    phone,
    email,
    password
  });
};

export const editUser = (
  _id: string,
  username: string,
  password: string,
  email: string,
  phone: string,
  address: string,
  balance: number,
  role: number
) => {
  return instance.post('/api/user/edit', {
    _id,
    username,
    password,
    email,
    phone,
    address,
    balance,
    role
  });
};