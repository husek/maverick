import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import useProtectedRoute from '../../hooks/protectedRoute';
import { gameSelector } from '../../redux/selectors';
import { joinGame } from '../../redux/modules/games';
import { loadGameDeck } from '../../redux/modules/decks';
import ScoreBoard from '../../components/scoreBoard';
import GameStats from '../../components/gameStats';
import CardShoe from '../../components/cardShoe';
import PlayerHand from '../../components/playerHand';


const Game = () => {
  const { loadingUser } = useProtectedRoute();
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const { deck, game, isLoading } = useSelector(gameSelector)

  useEffect(() => {
    if ((gameId && !isLoading && !game?._id) || (!game?._id !== gameId)) {
      dispatch(joinGame(gameId))
        .then(({ gameDeckId }) => {
          dispatch(loadGameDeck(gameDeckId))
        });
    }
  }, [gameId]);

  if (isLoading || loadingUser) return <CircularProgress />
  return (
    <React.Fragment>
      <ScoreBoard scoreBoard={game?.score ?? []} />
      <GameStats stats={game?.stats} />
      <CardShoe deck={deck} gameId={gameId} />
      <PlayerHand players={game?.players ?? []} gameId={gameId} />
    </React.Fragment>
  );
}

export default Game;


