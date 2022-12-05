import { env } from '../config/env';

let eventGuid = 0;
export const todayStr = new Date().toISOString().replace(/T.*$/, '');

export function getHolidays(region = 'ukrainian') {
  const BASE_CALENDAR_URL = 'https://www.googleapis.com/calendar/v3/calendars';
  const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY = 'holiday@group.v.calendar.google.com';
  const API_KEY = env.VITE_GOOGLE_API_KEY;
  const CALENDAR_REGION = `en.${region}`;

  const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${API_KEY}`;

  return fetch(url).then((response) => response.json());
}

export function createEventId() {
  return String(eventGuid++);
}
