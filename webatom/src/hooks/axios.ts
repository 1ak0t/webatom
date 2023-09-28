import React, {useContext} from 'react';
import {AxiosInstance} from 'axios';

export type ContextValue = undefined | AxiosInstance;
export const AxiosContext = React.createContext<ContextValue>(undefined);

export function useAxios() {
  return useContext(AxiosContext);
}