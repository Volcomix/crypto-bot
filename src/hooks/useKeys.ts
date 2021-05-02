import { useEffect, useState } from 'react'

export default function useKeys() {
  const [apiKey, setApiKey] = useState('')
  const [secretKey, setSecretKey] = useState('')

  useEffect(() => {
    setApiKey(localStorage.getItem('apiKey') ?? '')
    setSecretKey(localStorage.getItem('secretKey') ?? '')
  }, [])

  function updateApiKey(key: string) {
    localStorage.setItem('apiKey', key)
    setApiKey(key)
  }

  function updateSecretKey(key: string) {
    localStorage.setItem('secretKey', key)
    setSecretKey(key)
  }

  return { apiKey, secretKey, updateApiKey, updateSecretKey }
}
