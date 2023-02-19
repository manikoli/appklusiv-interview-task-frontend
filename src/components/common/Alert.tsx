import MuiAlert, { type AlertColor, type AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'

const AlertComponent = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

interface AlertComponentProps {
  state: AlertStates
  message: string
  open: boolean
  handleAlertOpen: () => void
  reload: boolean
}

export enum AlertStates {
  info = 'info',
  error = 'error',
  success = 'success',
}

function Alert(props: AlertComponentProps): React.ReactElement {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }

    props.handleAlertOpen()
    if (props.reload ?? false) {
      window.location.reload()
    }
  }

  return (
    <Snackbar open={props.open} onClose={handleClose} autoHideDuration={1500}>
      <AlertComponent severity={props.state as AlertColor} sx={{ width: '100%' }}>
        {props.message}
      </AlertComponent>
    </Snackbar>
  )
}

export default Alert
