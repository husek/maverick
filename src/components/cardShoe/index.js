import React, { useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import { CardShoeWrapper, Card, CardBorder } from './styles'
import miniLogo from './assets/minilogo.svg';
import { useDispatch } from 'react-redux';
import { dealCard } from '../../redux/modules/games';

const CardShoe = ({ deck = {}, gameId }) => {
  const dispatch = useDispatch();

  const cardsRemaining = useMemo(() => {
    return deck?.availableCards?.length;
  }, [deck?.availableCards?.length]);


  const handleDealCard = () => dispatch(dealCard(gameId));

  if (!cardsRemaining) return null;

  return (
    <CardShoeWrapper>
      <CardBorder onClick={handleDealCard}>
        <Card>
          <img src={miniLogo} alt="Click me"/>
        </Card>
      </CardBorder>
      <Typography style={{ marginTop: '1em', textAlign: 'center' }}>{cardsRemaining} Cards remaining</Typography>
    </CardShoeWrapper>
  );
}


export default CardShoe;


