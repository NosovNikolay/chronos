import * as React from "react";
import { ReactNode } from "react";
import AuthService from "../services/authService";

interface AuthContextType {
  authed: boolean
  login: (email: string | undefined, password: string | undefined) => Promise<unknown>
  logout: () => Promise<unknown>,
}

const initialState: AuthContextType = {
  authed: false,
  login: async () => console.error('No AuthProvider supplied. Wrap this component with a AuthProvider to use this functionality.'),
  logout: async () => console.error('No AuthProvider supplied. Wrap this component with a AuthProvider to use this functionality.'),
};

const authContext = React.createContext(initialState);

function useAuth() {
  const [authed, setAuthed] = React.useState(true);
  return {
    authed,
    login(email: string | undefined, password: string | undefined) {
      return new Promise<void>((resolve, reject) => {
        if(email === '1') {
          reject();
          return;
        }
        setAuthed(true);
        resolve();
      });
    },
    logout() {
      return new Promise(() => {
        setAuthed(false);
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
