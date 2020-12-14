import { combineReducers } from 'redux';
import user from './user';
import games from './games'
import decks from './decks'


export default function createReducer(reducers) {
  return combineReducers({
    user,
    games,
    decks,
    ...reducers
  });
}
