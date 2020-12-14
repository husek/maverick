import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const GameStatsWrapper = styled(Paper)`
  padding: 0.5em;
  position: absolute;
  top: 0;
  left: 0;
`;

export const SuitName = styled(Typography)`
  font-weight: bold;
  color: ${({ suitColor }) => suitColor === 'black' ? '#000' : '#c80000'}
`