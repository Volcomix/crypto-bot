import { KlineBar, KlineInterval, Ticker } from '../types'

export async function readTickers(): Promise<Ticker[]> {
  const tickersTimestamp = Number(localStorage.getItem('tickersTimestamp'))

  if (Date.now() - tickersTimestamp < 300000) {
    return JSON.parse(localStorage.getItem('tickers')!)
  }

  const tickersResponse = await fetch('/api/v3/ticker/24hr')
  const tickersRaw: any[] = await tickersResponse.json()

  const tickers = tickersRaw.map<Ticker>((ticker) => ({
    symbol: ticker.symbol,
    priceChange: Number(ticker.priceChange),
    priceChangePercent: Number(ticker.priceChangePercent),
    weightedAvgPrice: Number(ticker.weightedAvgPrice),
    prevClosePrice: Number(ticker.prevClosePrice),
    lastPrice: Number(ticker.lastPrice),
    lastQty: Number(ticker.lastQty),
    bidPrice: Number(ticker.bidPrice),
    askPrice: Number(ticker.askPrice),
    openPrice: Number(ticker.openPrice),
    highPrice: Number(ticker.highPrice),
    lowPrice: Number(ticker.lowPrice),
    volume: Number(ticker.volume),
    quoteVolume: Number(ticker.quoteVolume),
    openTime: ticker.openTime,
    closeTime: ticker.closeTime,
    firstId: ticker.firstId,
    lastId: ticker.lastId,
    count: ticker.count,
  }))

  localStorage.setItem('tickersTimestamp', Date.now().toString())
  localStorage.setItem('tickers', JSON.stringify(tickers))

  return tickers
}

export async function readKlines(
  symbol: string,
  interval: KlineInterval
): Promise<KlineBar[]> {
  const klinesResponse = await fetch(
    `/api/v3/klines?symbol=${symbol}&interval=${interval}`
  )
  const klinesRaw: any[][] = await klinesResponse.json()

  return klinesRaw.map<KlineBar>(
    ([
      openTime,
      open,
      high,
      low,
      close,
      volume,
      closeTime,
      quoteAssetVolume,
      numberOfTrades,
      takerBuyBaseAssetVolume,
      takerBuyQuoteAssetVolume,
    ]) => ({
      openTime,
      open: Number(open),
      high: Number(high),
      low: Number(low),
      close: Number(close),
      volume: Number(volume),
      closeTime,
      quoteAssetVolume: Number(quoteAssetVolume),
      numberOfTrades,
      takerBuyBaseAssetVolume: Number(takerBuyBaseAssetVolume),
      takerBuyQuoteAssetVolume: Number(takerBuyQuoteAssetVolume),
    })
  )
}
