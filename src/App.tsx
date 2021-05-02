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

type Ticker = {
  eventType: string
  eventTime: number
  symbol: string
  closePrice: number
  openPrice: number
  highPrice: number
  lowPrice: number
  totalTradedBaseAssetVolume: number
  totalTradedQuoteAssetVolume: number
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

  async function subscribeToTickerStream() {
    const stream = new WebSocket(
      'wss://stream.binance.com:9443/ws/!miniTicker@arr'
    )
    const data: { [symbol: string]: Ticker } = {}
    const startDate = Date.now()
    stream.onmessage = async (ev) => {
      let tickers: Ticker[] = JSON.parse(ev.data).map(
        ({ e, E, s, c, o, h, l, v, q }: any): Ticker => ({
          eventType: e,
          eventTime: E,
          symbol: s,
          closePrice: Number(c),
          openPrice: Number(o),
          highPrice: Number(h),
          lowPrice: Number(l),
          totalTradedBaseAssetVolume: Number(v),
          totalTradedQuoteAssetVolume: Number(q),
        })
      )
      for (const ticker of tickers) {
        if (ticker.symbol.endsWith('BUSD')) {
          data[ticker.symbol] = ticker
        }
      }
      console.log('Tickers loaded:', Object.keys(data).length)
      if (Date.now() - startDate > 10000) {
        stream.close()
        const selectedTickers = Object.values(data)
          .sort(
            (a, b) =>
              b.totalTradedQuoteAssetVolume - a.totalTradedQuoteAssetVolume
          )
          .slice(0, 3)
        console.log(selectedTickers)

        await Promise.all(
          selectedTickers.map(async (ticker) => {
            const klinesResponse = await fetch(
              `/api/v3/klines?symbol=${ticker.symbol}&interval=5m`
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
            console.log(`${ticker.symbol}:`, bars)
          })
        )
      }
    }
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
        <Button variant="outlined" onClick={subscribeToTickerStream}>
          Subscribe to ticker stream
        </Button>
        <Button
          className={classes.mainAction}
          variant="contained"
          color="primary"
        >
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
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto 1fr',
    gridTemplateRows: 'repeat(2, auto)',
    rowGap: theme.spacing(3),
  },
  account: {
    display: 'grid',
    rowGap: theme.spacing(1),
  },
  mainAction: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
}))
