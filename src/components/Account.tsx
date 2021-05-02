import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import { toBytes, toHex } from '../helpers/string'
import useKeys from '../hooks/useKeys'

export default function Account() {
  const classes = useStyles()
  const { apiKey, secretKey, updateApiKey, updateSecretKey } = useKeys()

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

  return (
    <div className={classes.root}>
      <TextField
        id="api-key"
        label="API Key"
        type="password"
        value={apiKey}
        onChange={(event) => updateApiKey(event.target.value)}
      />
      <TextField
        id="api-secret"
        label="Secret Key"
        type="password"
        value={secretKey}
        onChange={(event) => updateSecretKey(event.target.value)}
      />
      <Button disabled={!(apiKey && secretKey)} onClick={getAccountInformation}>
        Get account information
      </Button>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    rowGap: theme.spacing(1),
  },
}))
