export type KlineInterval =
  | '1m'
  | '3m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '2h'
  | '4h'
  | '6h'
  | '8h'
  | '12h'
  | '1d'
  | '3d'
  | '1w'
  | '1M'

export type KlineBar = {
  openTime: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  closeTime: number
  quoteAssetVolume: number
  numberOfTrades: number
  takerBuyBaseAssetVolume: number
  takerBuyQuoteAssetVolume: number
}

export type StreamingTicker = {
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

export type Ticker = {
  symbol: string
  priceChange: number
  priceChangePercent: number
  weightedAvgPrice: number
  prevClosePrice: number
  lastPrice: number
  lastQty: number
  bidPrice: number
  askPrice: number
  openPrice: number
  highPrice: number
  lowPrice: number
  volume: number
  quoteVolume: number
  openTime: 1499783499040
  closeTime: 1499869899040
  /** First tradeId */
  firstId: 28385
  /** Last tradeId */
  lastId: 28460
  /** Trade count */
  count: 76
}
