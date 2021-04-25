import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { useState } from 'react'
import theme from './theme'

const storedApiKey = localStorage.getItem('apiKey') ?? ''
const storedSecretKey = localStorage.getItem('secretKey') ?? ''

export default function App() {
  const classes = useStyles()
  const [apiKey, setApiKey] = useState(storedApiKey)
  const [secretKey, setSecretKey] = useState(storedSecretKey)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <TextField
          label="API Key"
          type="password"
          value={apiKey}
          onChange={(event) => {
            setApiKey(event.target.value)
            localStorage.setItem('apiKey', event.target.value)
          }}
        />
        <TextField
          label="Secret Key"
          type="password"
          value={secretKey}
          onChange={(event) => {
            setSecretKey(event.target.value)
            localStorage.setItem('secretKey', event.target.value)
          }}
        />
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
