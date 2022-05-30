import { ILogin, IUser } from '../../interfaces';
import { loginService, Toast } from '../../services/global';
import { getUserByToken } from '../../services/user.service';
import { globalAction } from './global.slices';

export const setLoading = (loading: boolean) => (dispatch: any) => {
  return dispatch(
    globalAction.setLoading({
      loading,
    }),
  );

  // setTimeout(
  //   () =>
  //     dispatch(
  //       globalAction.setLoading({
  //         loading,
  //       })
  //     ),
  //   500
  // );
};

const clearStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expired_at');
};

export const userSet = (user: IUser) => async (dispatch: any) => {
  dispatch(globalAction.setUser({ user }));
};

export const loginByPassword = (params: ILogin) => async (dispatch: any) => {
  return loginService(params)
    .then(({ user, jwt }) => {
      dispatch(userSet(user));
      dispatch(login({ token: jwt }));
    })
    .catch((e) => Toast.error(e));
};

export const autoLogIn = () => async (dispatch: any) => {
  const token = localStorage.getItem('token');

  if (token) {
    return getUserByToken()
      .then(({ user }) => {
        dispatch(userSet(user));
      })
      .catch((e) => {
        Toast.error(e);

        if (e.response?.status === 404) {
          dispatch(userLogout());
        }
      });
  }

  window.location.href = window.location.href.replace(window.location.pathname, '/');
};

export const login = (data: any) => async (dispatch: any) => {
  localStorage.setItem('token', data.token ? data.token : '');

  dispatch(globalAction.logIn({ ...data }));
};

export const userLogout = () => async (dispatch: any) => {
  clearStorage();
  dispatch(globalAction.logOut());
};
