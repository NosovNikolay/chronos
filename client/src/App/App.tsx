import { ReactElement } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Calendar from './components/calendar/Calendar';
import ResponsiveAppBar from './components/navbar/Navbar';
import useAuth from './hooks/useAuth';
import { RemoveScroll } from 'react-remove-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './components/404/PageNotFound';
import Dashboard from './components/dashboard/Dashboard';

const Home = () => <h1>About page</h1>;
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
            path='/calendar'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
      />
    </RemoveScroll>
  );
}
