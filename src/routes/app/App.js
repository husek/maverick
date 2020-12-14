import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Background } from './styles';

const SplashScreen = React.lazy(() => import('../splashscreen'));
const Login = React.lazy(() => import('../login'));
const Dashboard = React.lazy(() => import('../dashboard'));
const Game = React.lazy(() => import('../game'));

const App = () => {
  return (
    <Background>
      <Suspense fallback={<CircularProgress />}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <SplashScreen />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/dashboard">
              <Dashboard />
            </Route>

            <Route path="/game/:gameId">
              <Game />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </Background>
  );
}

export default App;

