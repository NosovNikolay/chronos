import { cleanEnv, url, str } from 'envalid';

export const env = cleanEnv(import.meta.env, {
  VITE_APP_API: url(),
  VITE_GOOGLE_API_KEY: str(),
});
