import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import ReduxThunk from 'redux-thunk';
import createMiddleware from './middleware/clientMiddleware';
import createReducer from './modules/reducer';


const create = client => {
  const clientMiddleware = createMiddleware(client);
  const rootReducer = createReducer();
  const middlewares = applyMiddleware(ReduxThunk, clientMiddleware);
  const enhancers =  composeWithDevTools({})(middlewares);
  const store = createStore(rootReducer, {}, enhancers);
  store.asyncReducers = {};

  return { store };
};

export default create