import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const CardShoeWrapper = styled.div`
  position: absolute;
  top: calc(50vh - 150px);
  right: calc(50vw - 100px);
`;

export const CardBorder = styled(Paper)`
  padding: 0.5em;
  box-shadow: 7px 9px 1px 9px #403b3b;
`;

export const Card = styled.div`
  cursor: pointer;
  width: 200px;
  height: 300px;
  border: 5px solid white;
  background: #0094d2;
  img {
    text-align: center;
    position: relative;
    width: 150px;
    top: 45%;
    left: 21px;
  }
`;