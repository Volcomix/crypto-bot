import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { readTickers } from '../api'

export default function SimpleQTable() {
  const classes = useStyles()
  const [isLearning, setLearning] = useState(false)

  async function learn() {
    setLearning(true)

    const tickers = await readTickers()
    const selectedTickers = tickers
      .filter((ticker) => ticker.symbol.endsWith('BUSD'))
      .sort((a, b) => b.quoteVolume - a.quoteVolume)
      .slice(0, 3)

    console.log(selectedTickers)

    setLearning(false)
  }

  return (
    <Button
      className={classes.root}
      variant="contained"
      color="primary"
      onClick={learn}
    >
      {isLearning ? 'Cancel' : 'Learn'}
    </Button>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
}))
