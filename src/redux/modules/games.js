const CREATE_GAME = 'maverick/games/CREATE_GAME';
const CREATE_GAME_SUCCESS = 'maverick/games/CREATE_GAME_SUCCESS';
const CREATE_GAME_FAIL = 'maverick/games/CREATE_GAME_FAIL';

const LOAD_GAME_LIST = 'maverick/games/LOAD_GAME_LIST';
const LOAD_GAME_LIST_SUCCESS = 'maverick/games/LOAD_GAME_LIST_SUCCESS';
const LOAD_GAME_LIST_FAIL = 'maverick/games/LOAD_GAME_LIST_FAIL';

const LOAD_GAME = 'maverick/games/LOAD_GAME';
export const LOAD_GAME_SUCCESS = 'maverick/games/LOAD_GAME_SUCCESS';
const LOAD_GAME_FAIL = 'maverick/games/LOAD_GAME_FAIL';


const SHUFFLE_DECK = 'maverick/games/SHUFFLE_DECK';
export const SHUFFLE_DECK_SUCCESS = 'maverick/games/SHUFFLE_DECK_SUCCESS';
const SHUFFLE_DECK_FAIL = 'maverick/games/SHUFFLE_DECK_FAIL';

const CLEAR_ERRORS = 'maverick/decks/CLEAR_ERRORS';



export const initialState = {
  loading: false,
  error: null,
  games: [],
  currentGame: {}
};

export default function reducer(state = { ...initialState }, action = {}) {
  switch (action.type) {
    case LOAD_GAME:
    case LOAD_GAME_LIST: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }

    case LOAD_GAME_LIST_SUCCESS: {
      return {
        ...state,
        games: action.result.games,
        loading: false,
        error: null
      }
    }

    case LOAD_GAME_SUCCESS: {
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          ...action.result
        },
        loading: false,
        error: null
      }
    }

    case CREATE_GAME_SUCCESS: {
      return {
        ...state,
        games: [...state.games, action.result],
        loading: false,
        error: null
      }
    }


    case LOAD_GAME_FAIL:
    case LOAD_GAME_LIST_FAIL:
    case CREATE_GAME_FAIL: {
      return {
        ...state,
        loading: false,
        error: action?.error?.message ?? 'Something went wrong'
      }
    }

    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null
      }
    }

    case CREATE_GAME:
    default:
      return state;
  }
}


export function loadGameList() {
  return {
    types: [LOAD_GAME_LIST, LOAD_GAME_LIST_SUCCESS, LOAD_GAME_LIST_FAIL],
    promise: api => api.get('/game')
  }
}

export function loadGame(gameId) {
  return {
    types: [LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAIL],
    promise: api => api.get(`/game/${gameId}`)
  }
}

export function joinGame(gameId) {
  return {
    types: [LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAIL],
    promise: api => api.put(`/game/${gameId}/join`)
  }
}

export function dealCard(gameId) {
  return {
    types: [LOAD_GAME, LOAD_GAME_SUCCESS, LOAD_GAME_FAIL],
    promise: api => api.post(`/game/${gameId}/deal`)
  }
}

export function clearError() {
  return {
    type: CLEAR_ERRORS
  }
}

export function createGame({ deckId, title }) {
  return {
    types: [CREATE_GAME, CREATE_GAME_SUCCESS, CREATE_GAME_FAIL],
    promise: api => api.post('/game', { body: { deckId, title }})
  }
}

export function shuffleGameDeck(gameId) {
  return {
    types: [SHUFFLE_DECK, SHUFFLE_DECK_SUCCESS, SHUFFLE_DECK_FAIL],
    promise: api => api.post(`/game/${gameId}/shuffle`)
  }
}