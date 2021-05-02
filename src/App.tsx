import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useEffect, useState } from 'react'
import theme from './theme'

type Bar = {
  openTime: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  closeTime: number
  quoteAssetVolume: number
  tradesCount: number
  takerBuyBaseAssetVolume: number
  takerBuyQuoteAssetVolume: number
}

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

  async function test() {
    const exchangeInfoResponse = await fetch('/api/v3/exchangeInfo')
    console.log(await exchangeInfoResponse.json())
    const klinesResponse = await fetch(
      '/api/v3/klines?symbol=ETHBUSD&interval=5m'
    )
    const klines: number[][] = await klinesResponse.json()
    const bars = klines.map<Bar>(
      ([
        openTime,
        open,
        high,
        low,
        close,
        volume,
        closeTime,
        quoteAssetVolume,
        tradesCount,
        takerBuyBaseAssetVolume,
        takerBuyQuoteAssetVolume,
      ]) => ({
        openTime,
        open,
        high,
        low,
        close,
        volume,
        closeTime,
        quoteAssetVolume,
        tradesCount,
        takerBuyBaseAssetVolume,
        takerBuyQuoteAssetVolume,
      })
    )
    console.log(bars)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.account}>
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
        <Button variant="contained" color="primary" onClick={test}>
          Test
        </Button>
      </div>
    </ThemeProvider>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    justifyItems: 'center',
    alignItems: 'center',
  },
  account: {
    display: 'grid',
    rowGap: theme.spacing(1),
  },
}))
