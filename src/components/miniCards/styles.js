import styled from 'styled-components';

export const MiniCardWrapper = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.1em;
  height: 30px;
  width: 30px;
  color: ${({ color }) => color === 'black' ? '#000' : '#c80000'};
  .value {
    font-weight: bold;
  }
  .suit {
    margin-left: 0.2em;
    font-size: 1.2em;
  }
`;