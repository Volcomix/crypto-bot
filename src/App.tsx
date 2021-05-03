import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Account from './components/Account'
import SimpleQTable from './components/SimpleQTable'
import TestStreaming from './components/TestStreaming'
import theme from './theme'

export default function App() {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Account />
        <TestStreaming />
        <SimpleQTable />
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
    gridTemplateRows: 'max-content auto',
    alignItems: 'start',
    rowGap: theme.spacing(3),
  },
}))
