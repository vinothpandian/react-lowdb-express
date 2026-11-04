import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

it('loads existing data, persists additions, and deletes records without changing the storage format', async () => {
  localStorage.setItem('db', JSON.stringify({ dictionary: [{ id: 'existing', key: 'original', value: 'retained' }] }));
  const { default: Form } = await import('./js/Home/LocalStorageFeatureForm');
  render(<Form />);
  expect(screen.getByText('original')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Key'), { target: { value: 'new key' } });
  fireEvent.change(screen.getByLabelText('Value'), { target: { value: 'new value' } });
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByText('new value')).toBeInTheDocument();
  let saved = JSON.parse(localStorage.getItem('db'));
  expect(saved.dictionary).toHaveLength(2);
  expect(saved.dictionary[1]).toMatchObject({ key: 'new key', value: 'new value', id: expect.any(String) });
  fireEvent.click(document.getElementById('buttonexisting'));
  saved = JSON.parse(localStorage.getItem('db'));
  expect(saved.dictionary).toHaveLength(1);
  expect(saved.dictionary[0].key).toBe('new key');
  expect(screen.queryByText('original')).not.toBeInTheDocument();
});
