import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { GameStatsWrapper, SuitName } from './styles'

const renderCardCount = ({ card, qty }) => (
  <ListItem key={`${card}_${qty}`}>
    <ListItemText primary={(
      <span>
        <strong>{card === '0' ? '10' : card }:</strong> {qty}
      </span>
    )} />
  </ListItem>
);

const GameStats = ({ stats = {} }) => {
  return (
    <GameStatsWrapper>
      <Grid container>
        <Grid item>
          <Typography variant="h6">Remaining Cards</Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <SuitName suitColor="red">♥️ Hearts {stats?.H?.length}</SuitName>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {stats?.H?.map(renderCardCount)}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <SuitName suitColor="black">♠️ Spades {stats?.S?.length}</SuitName>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {stats?.S?.map(renderCardCount)}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <SuitName suitColor="black">♣️️ Clubs {stats?.C?.length}</SuitName>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {stats?.C?.map(renderCardCount)}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <SuitName suitColor="red">♦️ Diamonds {stats?.D?.length}</SuitName>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {stats?.D?.map(renderCardCount)}
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </GameStatsWrapper>
  );
}

GameStats.propTypes = {};

export default GameStats;


