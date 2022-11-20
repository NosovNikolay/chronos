import axios, { AxiosError } from 'axios';
import * as React from 'react';
import {env} from '../config/env';

export interface LoginData {
  email: string;
  password: string;
}

type ProviderProps = {
  children?: React.ReactNode;
};

export interface RegistationData extends LoginData {
  username: string;
  // wantsRecieveNotifications: boolean,
}
interface AuthContextType {
  authed: boolean;
  login: (email: string, password: string) => Promise<unknown>;
  logout: () => Promise<unknown>;
}

const initialState: AuthContextType = {
  authed: false,
  login: async () =>
    console.error(
      'No AuthProvider supplied. Wrap this component with a AuthProvider to use this functionality.',
    ),
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
      try {
        const responce = await axios.post(
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
      } catch (err) {
        if (err instanceof AxiosError) return err.toJSON();
      }
    },
    logout() {
      return new Promise(() => {
        setAuthed(false);
      });
    },
  };
}

export function AuthProvider({ children }: ProviderProps): React.ReactNode {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
