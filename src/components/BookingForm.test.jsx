import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm, { validate } from './BookingForm.jsx';
import { todayISO } from '../api.js';

const times = ['17:00', '18:30'];
const setup = (props = {}) => {
  const onSubmit = vi.fn();
  const dispatch = vi.fn();
  render(<BookingForm availableTimes={times} dispatch={dispatch} onSubmit={onSubmit} {...props} />);
  return { onSubmit, dispatch };
};

describe('BookingForm', () => {
  test('renders all fields with accessible labels', () => {
    setup();
    ['Name', 'Date', 'Time', 'Number of guests', 'Occasion'].forEach((l) =>
      expect(screen.getByLabelText(l)).toBeInTheDocument());
    expect(screen.getByRole('form', { name: /table reservation/i })).toBeInTheDocument();
  });

  test('has HTML5 validation attributes', () => {
    setup();
    expect(screen.getByLabelText('Name')).toBeRequired();
    expect(screen.getByLabelText('Number of guests')).toHaveAttribute('min', '1');
    expect(screen.getByLabelText('Number of guests')).toHaveAttribute('max', '10');
    expect(screen.getByLabelText('Date')).toHaveAttribute('min', todayISO());
  });

  test('submit button is disabled until the form is valid', async () => {
    setup();
    const button = screen.getByRole('button', { name: /reserve table/i });
    expect(button).toBeDisabled();
    await userEvent.type(screen.getByLabelText('Name'), 'Ann');
    await userEvent.selectOptions(screen.getByLabelText('Time'), '17:00');
    expect(button).toBeEnabled();
  });

  test('shows an error for an invalid number of guests', () => {
    setup();
    const guests = screen.getByLabelText('Number of guests');
    fireEvent.change(guests, { target: { value: '11' } });
    fireEvent.blur(guests);
    expect(screen.getByRole('alert')).toHaveTextContent(/from 1 to 10/i);
    expect(guests).toHaveAttribute('aria-invalid', 'true');
  });

  test('dispatches UPDATE_TIMES when the date changes', () => {
    const { dispatch } = setup();
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2030-05-10' } });
    expect(dispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', date: '2030-05-10' });
  });

  test('submits the entered values', async () => {
    const { onSubmit } = setup();
    await userEvent.type(screen.getByLabelText('Name'), '  Ann ');
    await userEvent.selectOptions(screen.getByLabelText('Time'), '18:30');
    await userEvent.click(screen.getByRole('button', { name: /reserve table/i }));
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Ann', time: '18:30', guests: '2' }));
  });

  test('shows a server error message', () => {
    setup({ submitError: 'We could not save your reservation.' });
    expect(screen.getByRole('alert')).toHaveTextContent(/could not save/i);
  });
});

describe('validate', () => {
  const ok = { name: 'Ann', date: todayISO(), time: '17:00', guests: '2' };
  test('accepts valid values', () => expect(validate(ok, times)).toEqual({}));
  test('rejects past dates', () => expect(validate({ ...ok, date: '2000-01-01' }, times).date).toBeDefined());
  test('rejects 0 and decimal guests', () => {
    expect(validate({ ...ok, guests: '0' }, times).guests).toBeDefined();
    expect(validate({ ...ok, guests: '2.5' }, times).guests).toBeDefined();
  });
  test('explains when no times are available', () => {
    expect(validate({ ...ok, time: '' }, []).time).toMatch(/no tables/i);
  });
});
