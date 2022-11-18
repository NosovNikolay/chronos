import {
  Link,
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation
} from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Calendar from "./components/calendar/Calendar";
import ResponsiveAppBar from "./components/navbar/Navbar";
import useAuth from "./hooks/useAuth";

const Home = () => <h1>About page</h1>;

function Nav() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
      </ul>
      {authed && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

function RequireAuth({ children }) {
  const { authed } = useAuth();
  const location = useLocation();
  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default function App() {
  const { authed } = useAuth();
  console.log( authed );
  return (
    <div>
      <ResponsiveAppBar/> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Calendar/>
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
