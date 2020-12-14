const LOAD_USER = 'maverick/user/LOAD_USER';
const LOAD_USER_SUCCESS = 'maverick/user/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'maverick/user/LOAD_USER_FAIL';

export const initialState = {
  username: null,
  userId: null,
  token: null
};

export default function reducer(state = { ...initialState }, action = {}) {
  switch (action.type) {
    case LOAD_USER_SUCCESS: {
      const { token, _id: userId, username } = action.result;
      localStorage.setItem('JWT_TOKEN', token);
      return {
        ...state,
        username,
        userId,
        token
      };
    }

    case LOAD_USER_FAIL:
    case LOAD_USER:
    default:
      return state;
  }
}


export function login({ username, password }) {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: api => api.post('/auth/login', { body: { username, password } })
  }
}

export function register({ username, password }) {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: api => api.post('/auth/register', { body: { username, password } })
  }
}

export function getUser() {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: api => api.get('/auth/me')
  }
}