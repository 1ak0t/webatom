import { Route, Routes} from 'react-router-dom'
import {AppRoutes} from './consts';
import Authorization from './pages/authorization/authorization';
import Catalog from './pages/catalog/catalog';
import PrivateRoute from './components/private-route/private-route';
import {HelmetProvider} from 'react-helmet-async';
import {useAppSelector} from './hooks/redux';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

function App() {
  const authStatus = useAppSelector(state => state.authStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoutes.Authorization} element={<Authorization />} />
          <Route path={AppRoutes.Catalog} element={
            <PrivateRoute authorizationStatus={authStatus}>
              <Catalog />
            </PrivateRoute>
          } />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;