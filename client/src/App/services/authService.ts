import axios from 'axios';

// TODO: rm service or create another way to handle axios
interface LoginData {
  email: string;
  password: string;
}
// unused now

interface RegistationData extends LoginData {
  username: string;
  // wantsRecieveNotifications: boolean,
}

class AuthService {
  static register = (data: RegistationData) => {
    return axios.post(`${import.meta.env.REACT_APP_API}/auth/sign-up`, {
      ...data,
    });
  };

  static login = (data: LoginData) => {
    return axios.post('http://localhost:3000/auth/sign-in', {
      ...data,
    });
  };
}

export default AuthService;
