import React, { useMemo, memo } from 'react';
import { MiniCardWrapper } from './styles';

const MiniCard = memo(({ card = '' }) => {
  const [cardValue, cardSuit, cardColor] = useMemo(() => {
    let [value, suit] = card;
    let color = 'red';

    if (value === '0') value = 10;

    switch (suit) {
      case 'H': {
        suit = '♥️';
        break;
      }
      case 'S': {
        suit = '♠️';
        color = 'black';
        break;
      }
      case 'C': {
        suit = '♣️️️';
        color = 'black';
        break;
      }
      case 'D': {
        suit = '♦️';
        break;
      }
      default:
        return null;
    }

    return [value, suit, color]
  }, [card])

  return (
    <React.Fragment>
      <MiniCardWrapper color={cardColor}>
        <span className="value">{cardValue}</span>
        <span className="suit">{cardSuit}</span>
      </MiniCardWrapper>
    </React.Fragment>
  );
});

export default MiniCard;
