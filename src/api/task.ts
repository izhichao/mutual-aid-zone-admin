import instance from '../utils/request';

export const getTasks = () => {
  return instance.get('/api/task');
};

export const getTask = (_id: number) => {
  return instance.get('/api/task/detail', { params: { _id } });
};

export const deleteTask = (_id: string) => {
  return instance.post('/api/task/delete', { _id });
};

export const editTask = (_id: string, title: string, price: number, status: number) => {
  return instance.post('/api/task/edit', { _id, title, price, status });
};
