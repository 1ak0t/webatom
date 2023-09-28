import React, {useMemo} from 'react';
import axios from 'axios'
import {AxiosContext} from '../hooks/axios';

export default function AxiosProvider({
                                        children,
                                      }: React.PropsWithChildren<unknown>) {
  const axiosApi = useMemo(() => {
    const ax = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });

    ax.interceptors.request.use((config) => {
      // Read token for anywhere, in this case directly from localStorage
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    return ax;
  }, []);

  return (
    <AxiosContext.Provider value={axiosApi}>{children}</AxiosContext.Provider>
  );
}