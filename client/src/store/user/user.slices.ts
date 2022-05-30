import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces';

interface IState {
  users: IUser[];
  user: IUser | null;
  count: number;
}

const initialState: IState = {
  users: [],
  user: null,
  count: 0,
};

export const { actions: usersAction, reducer: usersReducer } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<{ users: IUser[]; count: number }>) => ({
      ...state,
      ...action.payload,
    }),

    setUser: (state, action: PayloadAction<{ user: IUser | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
