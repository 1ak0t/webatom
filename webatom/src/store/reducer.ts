import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../consts';
import {changeAuthStatus} from './actions';


const initialState = {
  authStatus: AuthorizationStatus.NoAuth
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    });
});

export {reducer};