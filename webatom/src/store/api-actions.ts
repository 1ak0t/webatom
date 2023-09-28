import {createAsyncThunk} from '@reduxjs/toolkit';
import {loginUserData, Token} from '../types/user.types';
import {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {saveToken} from '../services/token';
import {changeAuthStatus, redirectToRoute} from './actions';
import {AppRoutes, AuthorizationStatus} from '../consts';

export const loginAction = createAsyncThunk<void, loginUserData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({username, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<Token>('auth/login', {username, password});
    saveToken(token);
    dispatch(changeAuthStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoutes.Catalog));
  },
);