import Typography from '@mui/material/Typography'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { useLocation, useNavigate } from 'react-router-dom'
import Navigation from './common/Navigation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import Alert, { AlertStates } from './common/Alert'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'

const THEME_MONT = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
})

const URL = process.env.REACT_APP_API_URL ?? ''

function Header(): React.ReactElement {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}')

  const [submit, setSubmit] = useState(false)

  const [alertState, setAlertState] = useState(AlertStates.success)
  const [alertMessage, setAlertMessage] = useState('first')
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertReload, setAlertReload] = useState(false)

  const [mobileOpen, setMobileOpen] = useState(false)

  const [isLogged, setIsLogged] = useState(user.name !== undefined)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname.includes('auth') && isLogged) {
      navigate('/home')
    }
  }, [user])

  const handleAnchorClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleAnchorClose = (): void => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen)
  }

  const goHome = (): void => {
    navigate('/home')
  }
  const goAuth = (): void => {
    navigate('/')
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

  useEffect(() => {
    if (submit) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
      void fetch(`${URL}/logout`, requestOptions)
        .then(async (response) => await response.json())
        .then((jsonData) => {
          if (jsonData.data !== undefined) {
            handleAlert(AlertStates.success, jsonData.message, false)
            handleAlertOpen()
            localStorage.removeItem('user')
            setIsLogged(false)
            navigate('/auth')
          } else {
            handleAlert(AlertStates.error, jsonData.message, false)
            setSubmit(false)
          }
        })
    }
  }, [isLogged, submit])

  const handleLogout = (): void => {
    setSubmit(true)
  }

  const navItems = [
    { title: 'Home', click: goHome },
    { title: 'Logout', click: handleLogout },
  ]
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        {isLogged && user.name.split(' ')[0]}
        {!isLogged && 'Guest'}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={item.click}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <ThemeProvider theme={THEME_MONT}>
      <AppBar sx={styles.appBar}>
        <Toolbar sx={styles.conatiner}>
          <Button color='inherit' size='large' sx={styles.homeButton} onClick={goHome}>
            <Typography fontSize={24}>HOME</Typography>
          </Button>
          {!isLogged && (
            <>
              <Button
                startIcon={<AccountCircleIcon />}
                color='inherit'
                size='large'
                sx={styles.homeButton}
                onClick={goAuth}
              >
                <Typography fontSize={24} sx={{ textTransform: 'none' }}>
                  Guest
                </Typography>
              </Button>
            </>
          )}
          {isLogged && (
            <>
              <Button
                startIcon={<AccountCircleIcon />}
                sx={styles.homeButton}
                onClick={handleAnchorClick}
                color='inherit'
                size='large'
              >
                <Typography fontSize={24} sx={{ textTransform: 'none' }}>
                  {user.name.split(' ')[0]}
                </Typography>
              </Button>
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleAnchorClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem color='warning' onClick={handleLogout}>
                  <PowerSettingsNewIcon fontSize='small' />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', minWidth: '320px', width: '50%' },
            }}
          >
            {drawer}
          </Drawer>
        </Toolbar>
      </AppBar>
      <Navigation />
      <Alert
        state={alertState}
        message={alertMessage}
        handleAlertOpen={handleAlertOpen}
        open={alertOpen}
        reload={alertReload}
      />
    </ThemeProvider>
  )
}

const styles = {
  appBar: {
    backgroundColor: '#380974',
    boxShadow: 'none',
  },
  conatiner: {
    justifyContent: 'space-between',
  },
  homeButton: {
    padding: 2,
    fontSize: '24px',
    '@media (max-width: 899px)': {
      display: 'none',
    },
  },
}

export default Header
