import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import App from './App'

test('stores API key', () => {
  render(<App />)
  const apiKey = faker.internet.password()
  const apiKeyTextbox = screen.getByLabelText('API Key')
  userEvent.type(apiKeyTextbox, apiKey)
  expect(localStorage.getItem('apiKey')).toBe(apiKey)
})

test('stores secret key', () => {
  render(<App />)
  const secretKey = faker.internet.password()
  const secretKeyTextbox = screen.getByLabelText('Secret Key')
  userEvent.type(secretKeyTextbox, secretKey)
  expect(localStorage.getItem('secretKey')).toBe(secretKey)
})
