import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Slide from '@mui/material/Slide'
import React, { useEffect, useState } from 'react'
import { type LoginFormData, type FormProps } from './AuthModal'
import { emailValid, passwordValid, PasswordValidationResponse } from '../../common/validators'
import { AlertStates } from '../common/Alert'

const URL = process.env.REACT_APP_API_URL ?? ''

function LoginForm(props: FormProps): React.ReactElement {
  const [submit, setSubmit] = useState(false)

  const [emailIsValid, setEmailValid] = useState(false)
  const [emailErrorText, setEmailErrorText] = useState('')

  const [passwordIsValid, setPasswordValid] = useState(false)
  const [passwordErrorText, setPasswordErrorText] = useState('')

  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setLoginFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  useEffect(() => {
    setSubmit(submit)
  }, [submit])

  useEffect(() => {
    if (submit) {
      if (emailIsValid && passwordIsValid) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginFormData),
        }
        void fetch(`${URL}/login`, requestOptions)
          .then(async (response) => await response.json())
          .then((jsonData) => {
            if (jsonData.data !== undefined) {
              localStorage.setItem('user', JSON.stringify(jsonData.data))
              props.handleAlert(AlertStates.success, jsonData.message, true)
            } else {
              props.handleAlert(AlertStates.error, jsonData.message, false)
              setSubmit(false)
            }
          })
      }
    }
  }, [emailIsValid, passwordIsValid, submit])

  const handleLogin = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmit(true)
    handleEmailError(loginFormData.email)
    handlePasswordError(loginFormData.password)
  }

  const handleEmailError = (value: string, error = 'Email is not valid'): void => {
    if (emailValid(value)) {
      setEmailValid(true)
      setEmailErrorText('')
    } else {
      setEmailValid(false)
      setEmailErrorText(error)
    }
  }

  const handlePasswordError = (value: string): void => {
    const response = passwordValid(value)
    if (response === PasswordValidationResponse.valid) {
      setPasswordValid(true)
      setPasswordErrorText('')
    } else {
      setPasswordValid(false)
      setPasswordErrorText(response)
    }
  }

  const handleFormToggle = (): void => {
    props.toggleForm()
  }

  return (
    <form onSubmit={handleLogin}>
      <Slide direction='left' in={props.open} mountOnEnter unmountOnExit>
        <Stack
          direction='column'
          justifyContent={'center'}
          alignItems={'flex-start'}
          spacing={2}
          sx={styles.moduleContainer}
        >
          <Typography variant='h2' component='h2'>
            Log in
          </Typography>
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            color='secondary'
            value={loginFormData.email}
            onChange={handleInputChange}
            sx={styles.input}
            name={'email'}
            type={'email'}
            helperText={emailErrorText}
            error={!emailIsValid && emailErrorText !== ''}
          />
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            color='secondary'
            value={loginFormData.password}
            onChange={handleInputChange}
            sx={styles.input}
            name={'password'}
            type={'password'}
            helperText={passwordErrorText}
            error={!passwordIsValid && passwordErrorText !== ''}
          />
          <Button
            variant='contained'
            size='large'
            color='secondary'
            type='submit'
            sx={styles.input}
            disabled={submit}
          >
            Log in
          </Button>
          <Typography>
            Not a member?&nbsp;
            <Link onClick={handleFormToggle} sx={{ cursor: 'pointer' }}>
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Slide>
    </form>
  )
}

const styles = {
  moduleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: '30px',
  },
  input: {
    width: '100%',
    minWidth: '200px',
    maxWidth: '500px',
  },
}

export default LoginForm
