import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import App from './App'

test('stores API key', () => {
  render(<App />)
  const apiKey = faker.internet.password()
  userEvent.type(screen.getByLabelText('API Key'), apiKey)
  expect(localStorage.getItem('apiKey')).toBe(apiKey)
})

test('loads API key', () => {
  const apiKey = faker.internet.password()
  localStorage.setItem('apiKey', apiKey)
  render(<App />)
  expect(screen.getByLabelText('API Key')).toHaveValue(apiKey)
})

test('stores secret key', () => {
  render(<App />)
  const secretKey = faker.internet.password()
  userEvent.type(screen.getByLabelText('Secret Key'), secretKey)
  expect(localStorage.getItem('secretKey')).toBe(secretKey)
})

test('loads secret key', () => {
  const secretKey = faker.internet.password()
  localStorage.setItem('secretKey', secretKey)
  render(<App />)
  expect(screen.getByLabelText('Secret Key')).toHaveValue(secretKey)
})
