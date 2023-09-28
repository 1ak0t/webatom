import {createAction} from '@reduxjs/toolkit';
import {AppRoutes, AuthorizationStatus} from '../consts';

export const changeAuthStatus = createAction<AuthorizationStatus>('changeAuthStatus');
export const redirectToRoute = createAction<AppRoutes>('redirect');