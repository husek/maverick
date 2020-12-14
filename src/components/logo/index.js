import React from 'react';
import Typography from '@material-ui/core/Typography';
import { LogoWrapper, WaterMark } from './styles';
import G2MLogo from './assets/g2mlogo.svg';

const Logo = () => (
  <React.Fragment>
    <LogoWrapper>
      <Typography variant="h2">Maverick</Typography>
    </LogoWrapper>
    <WaterMark src={G2MLogo} />
  </React.Fragment>
);

export default Logo;
