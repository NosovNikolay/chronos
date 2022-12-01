import { env } from '../config/env';

export const getEvents = (token: string, calendarId: string) => {
  return fetch(env.VITE_APP_API + '/calendar-events/' + calendarId, {
    headers: { 
      'Authorization': 'Bearer ' + token,
    },
  }).then((response) => {
    return response.json()}
  )
} 