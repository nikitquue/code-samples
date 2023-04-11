import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(({
  autocompleteContainer: {
    marginLeft: '42px',
    marginRight: '42px',
    marginBottom: '15px',
  },
  autocomplete: {
    width: '350px',
    padding: '0px 0px',
    '& .MuiOutlinedInput-root': { padding: '0' },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '42px',
    marginRight: '42px',
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '32px 42px',
  },

}));
