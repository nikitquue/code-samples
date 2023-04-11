import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Box, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { TOKEN_AUTH } from '../../graphql/mutations';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { StyledButton } from '../StyledButton';
import { white } from '../../constants/colors';
import { useStyles } from './styles';

const LoginForm = () => {
  const { handleSubmit, control, formState: { errors } } = useForm({ defaultValues: { email: '', password: '' } });
  const [tokenAuth] = useMutation(TOKEN_AUTH);
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const classes = useStyles();

  const onSubmit = async (data: { email: string; password: string }) => {
    await tokenAuth({ variables: { email: data.email, password: data.password } });
    context?.setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <Box className={classes.container}>
      <Typography
        variant="h2"
        color={white}
        sx={{
          textAlign: 'center',
          marginBottom: '35px',
        }}
      >
        SIGN IN
      </Typography>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <Box className={classes.fieldContainer}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                label="Email"
                type="email"
                inputProps={{
                  style: {
                    backgroundColor: white,
                    outline: 'none',
                    borderRadius: '8px',
                  },
                }}
                variant="filled"
              />
            )}
          />
          <Typography className={classes.errorText}>{errors.email?.message}</Typography>
        </Box>
        <Box className={classes.fieldContainer}>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password required' }}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                inputProps={{
                  style: {
                    backgroundColor: white,
                    outline: 'none',
                    borderRadius: '8px',
                  },
                }}
                value={value}
                label="Password"
                type="password"
                variant="filled"
              />
            )}
          />
          <Typography className={classes.errorText}>{errors.password?.message}</Typography>
        </Box>
        <Box className={classes.actionsContainer}>
          <StyledButton
            variant="contained"
            width="200px"
            label="Sign in"
            margin="0px 50px 0px 0px"
            action={handleSubmit(onSubmit)}
          />
          <Typography variant="subtitle2" color={white} sx={{ marginRight: '5px' }}>
            Forgot password?
          </Typography>
          <a href="#/" className={classes.link}>
            Click here
          </a>
        </Box>
        <Box className={classes.textContainer}>
          <Typography variant="subtitle2" color={white} sx={{ marginRight: '5px' }}>
            For new clients, please contact
          </Typography>
          <a href="#/" className={classes.link}>
            info@jellyfish.com
          </a>
        </Box>
        <Box className={classes.textContainer}>
          <a href="#/" className={classes.link} style={{ marginRight: '5px' }}>
            On a company license?
          </a>
          <Typography variant="subtitle2" color={white}>
            Ask your project manager to add you
          </Typography>
        </Box>
      </form>
    </Box>
  );
};
export default LoginForm;
