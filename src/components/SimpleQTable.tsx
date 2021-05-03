import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { readKlines, readTickers } from '../api'

export default function SimpleQTable() {
  const classes = useStyles()
  const [isLearning, setLearning] = useState(false)
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([])
  const [qValues, setQValues] = useState<number[][]>([])

  async function learn() {
    setLearning(true)

    const tickers = await readTickers()
    const selectedTickers = tickers
      .filter((ticker) => ticker.symbol.endsWith('BUSD'))
      .sort((a, b) => b.quoteVolume - a.quoteVolume)
      .slice(0, 3)

    setSelectedSymbols(selectedTickers.map(({ symbol }) => symbol))
    setQValues(
      Array.from({ length: 2 ** selectedTickers.length }, () =>
        Array.from({ length: selectedTickers.length }, () => 0)
      )
    )

    const klines = await Promise.all(
      selectedTickers.map(({ symbol }) => readKlines(symbol, '5m'))
    )

    console.log(klines)

    const i = Math.floor(Math.random() * 500)
    console.log(klines.map((bars) => bars[i].openTime))

    setLearning(false)
  }

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={learn}>
        {isLearning ? 'Cancel' : 'Learn'}
      </Button>
      <div className={classes.table}>
        {selectedSymbols.map((symbol) => (
          <Typography key={`state-${symbol}-header`} variant="body2">
            {symbol}
          </Typography>
        ))}
        {selectedSymbols.map((symbol) => (
          <Typography key={`action-${symbol}-header`} variant="body1">
            {symbol}
          </Typography>
        ))}
        {qValues.map((row, y) => (
          <React.Fragment key={`state-${y}`}>
            {selectedSymbols.map((symbol) => (
              <Typography key={`state-${symbol}-${y}`} variant="body2" />
            ))}
            {row.map((qValue, x) => (
              <Typography key={`action-${x}-${y}`} variant="body2">
                {qValue}
              </Typography>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    gridRow: '1 / -1',
    display: 'grid',
    rowGap: theme.spacing(2),
    justifyItems: 'center',
  },
  table: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, auto)',
    gap: theme.spacing(1),
    justifyItems: 'center',
    alignItems: 'center',
  },
}))
