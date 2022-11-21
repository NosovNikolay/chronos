import { ReactElement } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Calendar from './components/calendar/Calendar';
import ResponsiveAppBar from './components/navbar/Navbar';
import useAuth from './hooks/useAuth';
import {RemoveScroll} from 'react-remove-scroll';
// Description for unauth user
const Home = () => <h1>About page</h1>;
// Dashboard with calendars
const HomeAuth = () => <h1>About page auth</h1>;

type ProviderProps = {
  children: ReactElement<unknown>;
};

function RequireAuth({ children }: ProviderProps) {
  const { authed } = useAuth();
  const location = useLocation();
  return authed === true ? (
    children
  ) : (
    <Navigate to='/login' replace state={{ path: location.pathname }} />
  );
}

export default function App() {
  const { authed } = useAuth();
  return (
    <RemoveScroll>
      <div>
        <ResponsiveAppBar />

        <Routes>
          <Route path='/' element={authed ? <HomeAuth /> : <Home />} />
          <Route
            path='/calendar/:id'
            element={
              <RequireAuth>
                <Calendar />
              </RequireAuth>
            }
          />
          <Route
            path='/dashboard'
            element={
              <RequireAuth>
                <Calendar />
              </RequireAuth>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </div>
    </RemoveScroll>
  );
}
