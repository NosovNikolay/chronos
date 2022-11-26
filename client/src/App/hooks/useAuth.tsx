import axios, { AxiosError } from 'axios';
import * as React from 'react';
import { env } from '../config/env';

export interface LoginData {
  email: string;
  password: string;
}

type ProviderProps = {
  children?: React.ReactNode;
};

interface errorAuth {
  statusCode: number,
  message: string,
  error: string
}

interface loginSuccess {
  statusCode: number,
  token: string
}

export interface RegistationData extends LoginData {
  username: string;
  // wantsRecieveNotifications: boolean,
}
interface AuthContextType {
  authed: boolean;
  login: (email: string, password: string) => Promise<loginSuccess>;
  logout: () => Promise<unknown>;
}

const initialState: AuthContextType = {
  authed: false,
  login: async () => new Promise<loginSuccess>(() => { null }),
  logout: async () =>
    console.error(
      'No AuthProvider supplied. Wrap this component with a AuthProvider to use this functionality.',
    ),
};

const authContext = React.createContext(initialState);

function useAuth() {
  const token = localStorage.getItem('auth');
  const [authed, setAuthed] = React.useState(token ? true : false);
  return {
    authed,
    async login(email: string, password: string) {
      const responce = axios.post<loginSuccess, loginSuccess>(
          `${env.VITE_APP_API}/auth/sign-in`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          },
        );
        setAuthed(true);
        return responce;
    },
    logout() {
      return new Promise(() => {
        setAuthed(false);
      });
    },
  };
}

export function AuthProvider({ children }: ProviderProps) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
