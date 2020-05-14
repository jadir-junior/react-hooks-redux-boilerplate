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
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
  textField: {
    width: '100%',
  },
}));

function RegisterPage() {
  const classes = useStyles();
  const { register, handleSubmit, errors, getValues, formState } = useForm({
    mode: 'onBlur',
  });
  const [user, setUser] = useState({
    showPassword: false,
    showRepeatPassword: false,
  });

  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  function onSubmit(data) {
    if (data.name && data.email && data.password && data.repeatPassword) {
      dispatch(authenticationActions.register(data));
    }
  }

  function handleClickShowPassword(type) {
    setUser({ ...user, [type]: !user[type] });
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
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
            inputRef={register({
              required: 'O email é obrigatório',
              pattern: {
                value: validation.email,
                message: 'O email digitado não é um e-mail valido',
              },
            })}
            helperText={errors.email && errors.email.message}
          />
          <FormControl
            className={classes.textField}
            variant="outlined"
            error={!!errors.password}
            margin="normal"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Senha *
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={user.showPassword ? 'text' : 'password'}
              name="password"
              inputRef={register({
                required: 'A senha é obrigatória',
                validate: {
                  goodPassword: (value) =>
                    validation.goodPassword(value) ||
                    'Deve ter no mínimo 8 caracteres e conter letras maiúsculas e minúsculas e números',
                },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('showPassword')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {user.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            <FormHelperText id="helper-password">
              {errors.password && errors.password.message}
            </FormHelperText>
          </FormControl>
          <FormControl
            className={classes.textField}
            variant="outlined"
            error={!!errors.repeatPassword}
            margin="normal"
          >
            <InputLabel htmlFor="outlined-adornment-repeat-password">
              Repita a senha novamente *
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-repeat-password"
              type={user.showRepeatPassword ? 'text' : 'password'}
              name="repeatPassword"
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
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      handleClickShowPassword('showRepeatPassword')
                    }
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {user.showRepeatPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={200}
            />
            <FormHelperText id="helper-password">
              {errors.repeatPassword && errors.repeatPassword.message}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={registering}
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
