import { createStructuredSelector } from 'reselect';


export const deckListSelector = createStructuredSelector({
  isLoading: ({ decks }) => decks.loading,
  error: ({ decks }) => decks.error,
  decks: ({ decks }) => decks.decks
});


export const gameListSelector = createStructuredSelector({
  isLoading: ({ games }) => games.loading,
  error: ({ games }) => games.error,
  games: ({ games }) => games.games
});

export const gameSelector = createStructuredSelector({
  isLoading: ({ games, decks }) => !(games.currentGame?._id && decks.currentDeck?._id),
  game: ({ games }) => games.currentGame,
  deck: ({ decks }) => decks.currentDeck
});

export const userSelector = createStructuredSelector({
  username: ({ user }) => user.username,
  userId: ({ user }) => user.userId,
  token: ({ user }) => user.token,
})