import { fetchAPI, todayISO } from './api.js';

/** Initial state for the reducer: slots for today. */
export const initializeTimes = () => fetchAPI(todayISO());

/** Reducer: UPDATE_TIMES loads the slots for the chosen date. */
export function updateTimes(state, action) {
  if (action.type === 'UPDATE_TIMES') return fetchAPI(action.date);
  return state;
}
