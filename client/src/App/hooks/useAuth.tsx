import axios from 'axios';
import * as React from 'react';
import { env } from '../config/env';

export interface LoginData {
  email: string;
  password: string;
}

type ProviderProps = {
  children?: React.ReactNode;
};

export interface RegistationData extends LoginData {
  username: string;
}
interface AuthContextType {
  authed: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<unknown>;
}

const initialState: AuthContextType = {
  authed: false,
  token: null,
  login: async () =>
    new Promise<any>(() => {
      null;
    }),
  logout: async () =>
    new Promise<any>(() => {
      null;
    }),
};

const authContext = React.createContext(initialState);

function useAuth() {
  const token = localStorage.getItem('auth');
  const [authed, setAuthed] = React.useState(token ? true : false);
  return {
    authed,
    token,
    async login(email: string, password: string) {
      const responce = axios.post<any>(
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
    async logout() {
      localStorage.removeItem('auth');
      setAuthed(false);
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
