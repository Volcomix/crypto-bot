import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useEffect, useState } from 'react'
import theme from './theme'

function toBytes(data: string): Uint8Array {
  return Uint8Array.from({ length: data.length }, (_, i) => data.charCodeAt(i))
}

function toHex(data: ArrayBuffer): string {
  return Array.from(new Uint8Array(data))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export default function App() {
  const classes = useStyles()
  const [apiKey, setApiKey] = useState('')
  const [secretKey, setSecretKey] = useState('')

  useEffect(() => {
    setApiKey(localStorage.getItem('apiKey') ?? '')
    setSecretKey(localStorage.getItem('secretKey') ?? '')
  }, [])

  async function getAccountInformation() {
    const key = await crypto.subtle.importKey(
      'raw',
      toBytes(secretKey),
      { name: 'HMAC', hash: 'SHA-256' },
      true,
      ['sign']
    )
    const timestamp = Date.now()
    const queryString = `timestamp=${timestamp}`
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      toBytes(queryString)
    )
    const response = await fetch(
      `/api/v3/account?${queryString}&signature=${toHex(signature)}`,
      { headers: { 'X-MBX-APIKEY': apiKey } }
    )
    console.log(await response.json())
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <TextField
          id="api-key"
          label="API Key"
          type="password"
          value={apiKey}
          onChange={(event) => {
            setApiKey(event.target.value)
            localStorage.setItem('apiKey', event.target.value)
          }}
        />
        <TextField
          id="api-secret"
          label="Secret Key"
          type="password"
          value={secretKey}
          onChange={(event) => {
            setSecretKey(event.target.value)
            localStorage.setItem('secretKey', event.target.value)
          }}
        />
        <Button
          disabled={!(apiKey && secretKey)}
          onClick={getAccountInformation}
        >
          Get account information
        </Button>
      </div>
    </ThemeProvider>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'max-content',
    gridTemplateRows: 'repeat(2, min-content)',
    rowGap: theme.spacing(1),
  },
}))
