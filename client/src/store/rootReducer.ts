import { combineReducers } from '@reduxjs/toolkit';
import { globalReducer } from './global/global.slices';
import { usersReducer } from './user/user.slices';

export const rootReducer = combineReducers({
  global: globalReducer,
  users: usersReducer,
});
