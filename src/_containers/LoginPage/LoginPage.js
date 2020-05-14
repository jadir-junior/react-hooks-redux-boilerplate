import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
// import validation from '../../_helpers';
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { authenticationActions } from '../../_actions';
import { validation } from '../../_helpers';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  function onSubmit() {
    if (email && password) {
      dispatch(authenticationActions.login(email, password));
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          name="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            error={!!errors.email}
            type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            inputRef={register({
              required: 'O email é obrigatório',
              pattern: {
                value: validation.email,
                message: 'O email digitado não é um e-mail valido',
              },
            })}
            helperText={errors.email && errors.email.message}
          />
          <TextField
            error={!!errors.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            inputRef={register({ required: 'A senha é obrigatória' })}
            helperText={errors.password && errors.password.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {'Você ainda não tem conta? Cadastre-se'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export { LoginPage };
