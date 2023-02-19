import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Alert, { AlertStates } from '../common/Alert'

export interface FormProps {
  open: boolean
  toggleForm: () => void
  handleAlert: (state: AlertStates, message: string, reload: boolean) => void
}

export interface RegisterFormData {
  name: string
  email: string
  password: string
}

export interface LoginFormData {
  email: string
  password: string
}

function AuthModal(): React.ReactElement {
  const [registerOpen, setRegisterOpen] = useState(true)

  const [alertOpen, setAlertOpen] = useState(false)
  const [alertState, setAlertState] = useState(AlertStates.success)
  const [alertMessage, setAlertMessage] = useState('first')
  const [alertReload, setAlertReload] = useState(false)

  const switchForm = (): void => {
    setRegisterOpen((registerOpen) => !registerOpen)
  }

  const handleAlert = (state: AlertStates, message: string, reload: boolean): void => {
    setAlertState(state)
    setAlertMessage(message)
    setAlertReload(reload)
    handleAlertOpen()
  }

  const handleAlertOpen = (): void => {
    alertOpen ? setAlertOpen(false) : setAlertOpen(true)
  }

  return (
    <>
      <RegisterForm open={registerOpen} toggleForm={switchForm} handleAlert={handleAlert} />
      <LoginForm open={!registerOpen} toggleForm={switchForm} handleAlert={handleAlert} />

      <Alert
        state={alertState}
        message={alertMessage}
        handleAlertOpen={handleAlertOpen}
        open={alertOpen}
        reload={alertReload}
      />
    </>
  )
}

export default AuthModal
