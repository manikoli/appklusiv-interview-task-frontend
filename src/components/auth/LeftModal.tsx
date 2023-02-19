import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import MoreTimeIcon from '@mui/icons-material/MoreTime'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'

const THEME_MONT = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
})

const text = [
  {
    title: 'Secure payments',
    subtitle:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <AccountBalanceIcon sx={{ color: 'orange' }} fontSize='large' />,
  },
  {
    title: 'Save time',
    subtitle:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: <MoreTimeIcon sx={{ color: 'orange' }} fontSize='large' />,
  },
  {
    title: '24/7 support',
    subtitle:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <SupportAgentIcon sx={{ color: 'orange' }} fontSize='large' />,
  },
]

function LeftModal(): React.ReactElement {
  return (
    <Stack
      justifyContent={'center'}
      alignItems={'flex-start'}
      fontFamily={'"Marcellus", serif'}
      spacing={2}
      sx={styles.leftModalTextContainer}
    >
      <ThemeProvider theme={THEME_MONT}>
        <Typography variant='h3' component='h3' sx={styles.leftModalTextTitle} mb={2}>
          Join today
        </Typography>
      </ThemeProvider>

      {text.map((item, key) => {
        return (
          <Box key={key} sx={styles.iconTextContainer}>
            {item.icon}
            <Typography variant='h5' component='h5' fontWeight={400}>
              {item.title}
            </Typography>
            <Typography fontWeight={100} color={'#ccc'} sx={styles.h6}>
              {item.subtitle}
            </Typography>
          </Box>
        )
      })}
    </Stack>
  )
}

const styles = {
  leftModalTextContainer: {
    maxWidth: '300px',
    height: '100%',
    paddingLeft: '30px',
    paddingRight: '30px',
    color: 'white',
    '@media (max-width: 899px)': {
      flexDirection: 'row',
      maxWidth: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  iconTextContainer: {
    '@media (max-width: 899px)': {
      textAlign: 'center',
    },

    '@media (max-width: 690px)': {
      display: 'none',
    },
  },
  leftModalTextTitle: {
    '@media (max-width: 899px)': {
      display: 'none',
    },
  },
  h6: {
    '@media (max-width: 899px)': {
      display: 'none',
    },
  },
}

export default LeftModal
