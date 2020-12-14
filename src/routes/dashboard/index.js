import React, { useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import useProtectedRoute from '../../hooks/protectedRoute';
import Logo from '../../components/logo';
import DashboardModal from '../../components/dashboardModal';


const Dashboard = () => {
  const { loadingUser } = useProtectedRoute();
  const [currentModal, setCurrentModal] = useState(null);

  const setModal = routeName => () => setCurrentModal(routeName);
  const setClose = useCallback(() => setCurrentModal(null), []);

  if (loadingUser) return <CircularProgress />
  return (
    <React.Fragment>
      <DashboardModal isOpen={Boolean(currentModal)} view={currentModal} onClose={setClose} />
      <Grid container justify="center" alignItems="center" direction="column" spacing={4} style={{ height: '100%' }}>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item>
          <Paper style={{ padding: '0.8em' }}>
            <Grid container spacing={4}>
              <Grid item>
                <Button variant="contained" size="large" fullWidth color="primary" onClick={setModal('findGame')}>Join Game</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" size="large" fullWidth color="secondary" onClick={setModal('createGame')}>Create Game</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" size="large" fullWidth onClick={setModal('decks')}>Manage Decks</Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Dashboard;


