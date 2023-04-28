import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Listings from './listings/pages/Listings';
import EditListing from './listings/pages/EditListing';
import AddListing from './listings/pages/AddListing';
import Authenticate from './users/pages/Authenticate';
import MainNavigation from './shared/components/navigation/MainNavigation';

import { AuthContext } from './shared/context/auth-context';

import './App.css';
import UserListings from './listings/pages/UserListings';

const queryClient = new QueryClient();

let logoutTimer;
function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setuser(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({ userId: uid, token, expiration: tokenExpirationDate.toISOString() })
    )
  },[]);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  },[]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token &&
      new Date(storedData.expiration) > new Date()
      ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Listings />
        </Route>
        <Route path="/listings/new" exact>
          <AddListing />
        </Route>
        <Route path="/listings/userlistings" >
          <UserListings />
        </Route>
        <Route path="/listings/edit/:id">
          <EditListing />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Listings />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </QueryClientProvider>
  </AuthContext.Provider>
  );
}

export default App


