import Button from '@material-ui/core/Button'
import React from 'react'
import { readKlines } from '../api'
import { StreamingTicker } from '../types'

async function testStreaming() {
  const stream = new WebSocket(
    'wss://stream.binance.com:9443/ws/!miniTicker@arr'
  )
  const data: { [symbol: string]: StreamingTicker } = {}
  const startDate = Date.now()
  stream.onmessage = async (ev) => {
    let tickers: StreamingTicker[] = JSON.parse(ev.data).map(
      ({ e, E, s, c, o, h, l, v, q }: any): StreamingTicker => ({
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
          const klines = await readKlines(ticker.symbol, '5m')
          console.log(`${ticker.symbol}:`, klines)
        })
      )
    }
  }
}

export default function TestStreaming() {
  return (
    <Button variant="outlined" onClick={testStreaming}>
      Test streaming
    </Button>
  )
}
