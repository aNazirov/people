import api from '../api';

export const getAllUsers = (skip: number) => {
  return api
    .get('/user', {
      params: {
        skip,
      },
    })
    .then((res) => res.data);
};

export const updateUser = (id: number, params: FormData) => {
  return api.patch(`/user/${id}`, params).then((res) => res.data);
};

export const deleteUser = (id: number) => {
  return api.delete(`/user/${id}`).then((res) => res.data);
};

export const getUserByToken = () => {
  return api.get('/user/token').then((res) => res.data);
};
