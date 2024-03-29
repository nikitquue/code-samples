import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  playerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  progressBarStyle: {
    backgroundColor: '#ffe3d4',
    borderRadius: 10,
    position: 'relative',
    width: ' 100%',
    height: 11,
    outline: 'none',
    '&::-webkit-slider-runnable-track': {
      backgroundColor: '#ffe3d4',
      borderRadius: 10,
      position: 'relative',
      width: '100%',
      height: 11,
      outline: 'none',
    },
    '&::-moz-range-track': {
      backgroundColor: '#ffe3d4',
      borderRadius: 10,
      position: 'relative',
      width: '100%',
      height: 11,
      outline: 'none',
    },
    '&::-moz-focus-outer': {
      border: 0,
    },
    '&::before': {
      content: '',
      height: 11,
      width: 0,
      backgroundColor: 'red',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2,
      cursor: 'pointer',
    },
    '&::-moz-range-progress': {
      backgroundColor: '#ffc2a1',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      height: 11,
    },
    '&::-webkit-slider-thumb': {
      webkitAppearance: 'none',
      height: 15,
      width: 15,
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#3452a5',
      cursor: 'pointer',
      position: 'relative',
      margin: 0,
      marginTop: -2,
      zIndex: 3,
      boxSizing: 'border-box',
    },
    '&:active::-webkit-slider-thumb': {
      transform: 'scale(1.2)',
      backgroundColor: '#26c9c3',
    },
    '&::-moz-range-thumb': {
      height: 15,
      width: 15,
      borderRadius: '50%',
      border: 'transparent',
      backgroundColor: '#3452a5',
      cursor: 'pointer',
      position: 'relative',
      zIndex: 3,
      boxSizing: 'border-box',
    },
    '&:active::-moz-range-thumb': {
      transform: ' scale(1.2)',
      backgroundColor: '#26c9c3',
    },
  },
  progressBarContainer: {
    marginLeft: '15px',
    marginRight: '15px',
    display: 'flex',
    flexDirection: 'column',
  },

});

