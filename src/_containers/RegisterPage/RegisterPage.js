import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Avatar,
  TextField,
  Typography,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from 'react-hook-form';

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

function RegisterPage() {
  const classes = useStyles();
  const { register, handleSubmit, errors, getValues, formState } = useForm({
    mode: 'onBlur',
  });
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  function onSubmit() {
    if (user.name && user.email && user.password && user.repeatPassword) {
      dispatch(authenticationActions.register(user));
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <form
          className={classes.form}
          name="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            error={!!errors.name}
            type="text"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome completo"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
            inputRef={register({
              required: 'O nome é obrigatório',
            })}
            helperText={errors.name && errors.name.message}
          />
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
            inputRef={register({
              required: 'A senha é obrigatória',
              validate: {
                goodPassword: (value) =>
                  validation.goodPassword(value) ||
                  'Deve ter no mínimo 8 caracteres e conter letras maiúsculas e minúsculas e números',
              },
            })}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            error={!!errors.repeatPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repita a senha novamente"
            type="password"
            id="repeatPassword"
            autoComplete="current-repeatPassword"
            onChange={handleChange}
            inputRef={register({
              required: 'A senha é obrigatória',
              validate: {
                sameAs: (value) => {
                  const { password } = getValues();
                  return (
                    validation.sameAs(value, password) ||
                    'A senhas devem ser iguais'
                  );
                },
                goodPassword: (value) =>
                  validation.goodPassword(value) ||
                  'Deve ter no mínimo 8 caracteres e conter letras maiúsculas e minúsculas e números',
              },
            })}
            helperText={errors.repeatPassword && errors.repeatPassword.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!formState.isValid}
            className={classes.submit}
          >
            Cadastrar
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                {'Você já tem um conta? faça Login'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export { RegisterPage };
