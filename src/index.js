import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import App from './routes/app/App';
import reportWebVitals from './reportWebVitals';
import ApiClient from './services/apiClient';
import configureStore from './redux/create';
import GlobalStyle from './styles';


const client = new ApiClient();
const { store } = configureStore(client);


const theme = createMuiTheme({
  palette: {
    secondary: {
      main: green[900],
    },
    primary: {
      main: orange[800],
    },
  },
});


ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <App />
        </Provider>
      </StylesProvider>
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
