import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AxiosProvider from './services/axios-provider';
import {Provider} from 'react-redux';
import './index.scss';
import {store} from './store';
import {getToken} from './services/token';
import {changeAuthStatus} from './store/actions';
import {AuthorizationStatus} from './consts';

if (getToken() !== '') {
  store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AxiosProvider>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </AxiosProvider>
    </Provider>
  </React.StrictMode>
);