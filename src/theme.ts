import { createTheme } from '@material-ui/core/styles'

export default createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    error: {
      main: '#cf6679',
    },
  },
  props: {
    MuiTextField: {
      variant: 'filled',
    },
  },
})
