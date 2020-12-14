import { SHUFFLE_DECK_SUCCESS, LOAD_GAME_SUCCESS } from './games';

const LOAD_DECK = 'maverick/decks/LOAD_DECK';
const LOAD_DECK_SUCCESS = 'maverick/decks/LOAD_DECK_SUCCESS';
const LOAD_DECK_FAIL = 'maverick/decks/LOAD_DECK_FAIL';

const LOAD_DECK_LIST = 'maverick/decks/LOAD_DECK_LIST';
const LOAD_DECK_LIST_SUCCESS = 'maverick/decks/LOAD_DECK_LIST_SUCCESS';
const LOAD_DECK_LIST_FAIL = 'maverick/decks/LOAD_DECK_LIST_FAIL';

const DELETE_DECK = 'maverick/decks/DELETE_DECK';
const DELETE_DECK_SUCCESS = 'maverick/decks/DELETE_DECK_SUCCESS';
const DELETE_DECK_FAIL = 'maverick/decks/DELETE_DECK_FAIL';

const CREATE_DECK = 'maverick/decks/CREATE_DECK';
const CREATE_DECK_SUCCESS = 'maverick/decks/CREATE_DECK_SUCCESS';
const CREATE_DECK_FAIL = 'maverick/decks/CREATE_DECK_FAIL';

const CLEAR_ERRORS = 'maverick/decks/CLEAR_ERRORS';


export const initialState = {
  loading: false,
  error: null,
  decks: [],
  currentDeck: {}
};

export default function reducer(state = { ...initialState }, action = {}) {
  switch (action.type) {
    case LOAD_DECK:
    case LOAD_DECK_LIST: {
      return {
        ...state,
        loading: true,
        error: null
      }
    }

    case LOAD_DECK_LIST_SUCCESS: {
      return {
        ...state,
        decks: action.result.decks,
        loading: false,
        error: null
      }
    }

    case LOAD_GAME_SUCCESS: {
      if (!action.result?.gameDeck) return state;
      return {
        ...state,
        currentDeck: {
          ...state.currentDeck,
          ...action.result.gameDeck
        }
      }
    }

    case LOAD_DECK_SUCCESS: {
      return {
        ...state,
        currentDeck: action.result,
        loading: false,
        error: null
      }
    }

    case CREATE_DECK_SUCCESS: {
      return {
        ...state,
        decks: [...state.decks, action.result],
        loading: false,
        error: null
      }
    }

    case SHUFFLE_DECK_SUCCESS: {
      return {
        ...state,
        currentDeck: action.result.gameDeck
      }
    }

    case DELETE_DECK_SUCCESS: {
      return {
        ...state,
        decks: [...state.decks].filter(deck => deck._id !== action.deckId)
      }
    }

    case LOAD_DECK_FAIL:
    case CREATE_DECK_FAIL:
    case LOAD_DECK_LIST_FAIL:
    case DELETE_DECK_FAIL: {
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

    case CREATE_DECK:
    case DELETE_DECK:
    default:
      return state;
  }
}


export function loadGameDeck(deckId) {
  return {
    types: [LOAD_DECK, LOAD_DECK_SUCCESS, LOAD_DECK_FAIL],
    promise: api => api.get(`/deck/${deckId}`)
  }
}

export function loadDeckList() {
  return {
    types: [LOAD_DECK_LIST, LOAD_DECK_LIST_SUCCESS, LOAD_DECK_LIST_FAIL],
    promise: api => api.get('/deck')
  }
}

export function clearError() {
  return {
    type: CLEAR_ERRORS
  }
}

export function createDeck(deckCount) {
  return {
    types: [CREATE_DECK, CREATE_DECK_SUCCESS, CREATE_DECK_FAIL],
    promise: api => api.post('/deck', { body: { deckCount } })
  }
}

export function deleteDeck(deckId) {
  return {
    types: [DELETE_DECK, DELETE_DECK_SUCCESS, DELETE_DECK_FAIL],
    promise: api => api.del(`/deck/${deckId}`),
    deckId
  }
}
