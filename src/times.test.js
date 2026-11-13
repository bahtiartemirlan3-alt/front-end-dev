import { initializeTimes, updateTimes } from './times.js';
import { fetchAPI, submitAPI } from './api.js';

describe('available times', () => {
  test('initializeTimes returns a non-empty list of slots for today', () => {
    const times = initializeTimes();
    expect(Array.isArray(times)).toBe(true);
    expect(times.length).toBeGreaterThan(0);
  });

  test('updateTimes returns the slots for the selected date', () => {
    const result = updateTimes([], { type: 'UPDATE_TIMES', date: '2030-05-10' });
    expect(result).toEqual(fetchAPI('2030-05-10'));
  });

  test('updateTimes keeps the state for unknown actions', () => {
    const state = ['17:00'];
    expect(updateTimes(state, { type: 'OTHER' })).toBe(state);
  });
});

describe('mock API', () => {
  test('fetchAPI is deterministic for the same date', () => {
    expect(fetchAPI('2030-05-10')).toEqual(fetchAPI('2030-05-10'));
  });

  test('fetchAPI returns an empty list for invalid dates', () => {
    expect(fetchAPI('not-a-date')).toEqual([]);
    expect(fetchAPI(undefined)).toEqual([]);
  });

  test('submitAPI returns true for a valid booking', () => {
    expect(submitAPI({ name: 'Ann' })).toBe(true);
  });
});
