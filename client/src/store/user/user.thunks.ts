import { IUser } from '../../interfaces';
import { getOneService, Toast } from '../../services/global';
import { getAllUsers } from '../../services/user.service';
import { setLoading } from '../global/global.thunks';
import { usersAction } from './user.slices';

export const getAll =
  (skip: number = 0) =>
  (dispatch: any) => {
    return getAllUsers(skip)
      .then((users) => {
        dispatch(setUsers(users.length, users));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

export const setUsers =
  (count: number = 0, users: IUser[] = []) =>
  (dispatch: any) => {
    return dispatch(
      usersAction.setUsers({
        users,
        count,
      }),
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, 'user')
    .then((user) => {
      dispatch(setUser(user));
      dispatch(setLoading(false));
    })
    .catch((e) => {
      Toast.error(e);
    });
};

export const setUser =
  (user: IUser | null = null) =>
  (dispatch: any) => {
    return dispatch(
      usersAction.setUser({
        user,
      }),
    );
  };
