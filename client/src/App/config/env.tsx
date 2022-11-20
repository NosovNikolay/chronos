import { cleanEnv, url } from 'envalid';

export const env = cleanEnv(import.meta.env, {
  VITE_APP_API: url(),
})
