import { cleanEnv, str, num, email, url } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  REACT_APP_API: url(),
})