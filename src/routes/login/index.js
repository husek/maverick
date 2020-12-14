import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { login, register, getUser } from '../../redux/modules/user';

const Login = () => {
  const dispatch = useDispatch();
  const router = useHistory();

  const [error, _setError] = useState({ username: null, password: null });
  const [user, _setUser] = useState({ username: '', password: '' });
  const [isLoading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const setUser = val => _setUser(currentState => ({ ...currentState, ...val }));
  const setError = val => _setError(currentState => ({ ...currentState, ...val }));


  useEffect(() => {
    if (localStorage.getItem('JWT_TOKEN')) {
      dispatch(getUser())
        .then(() => {
          setLoading(false);
          router.push('/dashboard')
        })
        .catch(er => {
          console.log(er);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dispatch, router])

  const handleForm = ({ target }) => {
    const { name, value } = target;
    setUser({ [name]: value });
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    if (!user.username) return setError({ username: 'Invalid Username' });
    if (!user.password) return setError({ password: 'Invalid Password' });
    setError({ username: null, password: null });
    setLoading(true);

    const authMethod = isLogin ? login : register;

    return dispatch(authMethod(user))
      .then(() => {
        setLoading(false);
        router.push('/dashboard')
      }).catch(e => {
        setLoading(false);
        setError(
          isLogin
            ? { username: `Username doesn't exist or invalid password` }
            : { username: e })
      })
  }

  const toggleMode = () => setIsLogin(currentState => !currentState);

  return (
    <Grid container justify="center" alignItems="center" style={{ height: '100%' }}>
      <Paper style={{ padding: '0.8em', maxWidth: '300px' }}>

        {isLoading
          ? <CircularProgress size="4em" color="secondary" />
          : (
            <form onSubmit={handleFormSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {isLogin ? 'Login' : 'Register'}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    helperText={error.username}
                    error={error.username}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={user.username}
                    onChange={handleForm}
                    tabIndex={0}
                  />

                  <TextField
                    helperText={error.password}
                    error={error.password}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    value={user.password}
                    onChange={handleForm}
                    tabIndex={1}
                  />

                  <Button variant="contained" size="large" color="secondary" type="submit" tabIndex={2} fullWidth>
                    {isLogin ? 'Enter' : 'Send'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button tabIndex={3} fullWidth onClick={toggleMode}>
                    {isLogin ? 'Create Account' : 'Back to Login'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
      </Paper>
    </Grid>
  );
}

export default Login;


