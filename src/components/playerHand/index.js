import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { userSelector } from '../../redux/selectors';
import { shuffleGameDeck } from '../../redux/modules/games';
import MiniCard from '../miniCards';
import { PlayerHandWrapper } from './styles'


const PlayerHand = ({ players = [], gameId }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector(userSelector);

  const myCards = useMemo(() => {
    return players.find(({ playerId }) => playerId === userId)?.cards ?? [];
  }, [players, userId]);

  const handleShuffle = () => dispatch(shuffleGameDeck(gameId));

  return (
    <PlayerHandWrapper>
      <Grid container>
        <Grid item xs={11}>
          {(myCards.length > 0)
            ? (
              <Grid container spacing={1}>
                {myCards.map(card => (
                  <Grid item>
                    <MiniCard card={card} />
                  </Grid>
                ))}
              </Grid>
            )
            : 'You have no cards, click the deck to draw'
          }
        </Grid>

        <Grid item xs={1}>
          <Button color="primary" onClick={handleShuffle}>Shuffle</Button>
        </Grid>
      </Grid>
    </PlayerHandWrapper>
  );
}


export default PlayerHand;


