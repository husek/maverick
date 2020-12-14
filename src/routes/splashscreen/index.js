import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Logo from '../../components/logo';


const SplashScreen = () => {
  const router = useHistory();

  const handleClickPlay = () => {
    router.push('/login');
  }

  return (
    <Grid container justify="center" alignItems="center" direction="column" spacing={2} style={{ height: '100%' }}>
      <Grid item>
        <Logo />
      </Grid>

      <Grid item>
        <Button variant="contained" size="large" color="primary" onClick={handleClickPlay}>
          Play
        </Button>
      </Grid>
    </Grid>
  );
}

export default SplashScreen;
