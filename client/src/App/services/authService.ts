import axios from 'axios';

// TODO: rm it if unused
interface LoginData {
  email: string;
  password: string;
}

interface RegistationData extends LoginData {
  username: string;
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
