import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LeftModal from '../components/auth/LeftModal'
import AuthModal from '../components/auth/AuthModal'
import background from '../bckg.jpg'

function Main(): React.ReactElement {
  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid item md={5} xs={12} sx={styles.leftContainer}>
        <Box sx={styles.modalLeftSide}>
          <LeftModal />
        </Box>
      </Grid>
      <Grid item md={7} xs={12} sx={styles.rightContainer}>
        <Box sx={styles.modalRightSide}>
          <AuthModal />
        </Box>
      </Grid>
    </Grid>
  )
}

const styles = {
  mainContainer: {
    backgroundColor: 'white',
  },
  leftContainer: {
    position: 'relative',
    background: 'linear-gradient(to right, #380974 0%, #8a39ef 100%)',
    backgroundImage: `url(${background})`,
    backgroundPositionY: '1300px',
    '@media (max-width: 899px)': {
      height: '30%',
      backgroundPositionY: '200px',
      // background: 'linear-gradient(to bottom, #380974 0%, #8a39ef 100%)',
    },
    '@media (max-width: 690px)': {
      height: '60px',
    },
  },
  modalLeftSide: {
    // backgroundColor: 'rgba(255, 255, 255, .1)',
    backdropFilter: 'blur(30px)',
    position: 'absolute',
    top: '15%',
    right: 0,
    bottom: '5%',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    zIndex: 10,
    '@media (max-width: 899px)': {
      borderRadius: 0,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      width: '80%',
      minWidth: '250px',
      height: '50%',
      bottom: 0,
      top: 'auto',
      left: '10%',
    },

    '@media (max-width: 690px)': {
      display: 'none',
    },
  },
  rightContainer: {
    position: 'relative',
    backgroundColor: '#e8d7fc',
    '@media (max-width: 899px)': {
      height: '100%',
      width: '100%',
    },
  },
  modalRightSide: {
    position: 'absolute',
    top: '15%',
    left: 0,
    width: '55%',
    minWidth: '500px',
    height: '80%',
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    boxShadow: '7px 0px 20px -3px #ccc',
    WebkitBoxShadow: '7px 0px 20px -3px #ccc',
    MozBoxShadow: '7px 0px 20px -3px #ccc',
    overflow: 'hidden',
    '@media (max-width: 899px)': {
      borderRadius: 0,
      top: 0,
      left: '10%',
      width: '80%',
      minWidth: '250px',
      height: '60%',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      boxShadow: '0px 7px 20px -3px #ccc',
      WebkitBoxShadow: '0px 7px 20px -3px #ccc',
      MozBoxShadow: '0px 7px 20px -3px #ccc',
    },
    '@media (max-width: 690px)': {
      top: '15%',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      paddingTop: '20px',
      paddingBottom: '20px',
    },
  },
}

export default Main
