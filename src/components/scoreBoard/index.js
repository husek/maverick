import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ScoreBoardWrapper } from './styles'
import { useDispatch } from 'react-redux';

const ScoreBoard = ({ scoreBoard = [] }) => {
  return (
    <ScoreBoardWrapper>
      <Grid container>
        <Grid item>
          <Typography variant="h6">Score</Typography>
          <List>
            {scoreBoard?.map(({ username, score }) => (
              <ListItem key={username}>
                <ListItemAvatar>
                  <Avatar>
                    {username[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={username} secondary={`${score} points`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </ScoreBoardWrapper>
  );
}

ScoreBoard.propTypes = {
  scoreBoard: PropTypes.arrayOf(PropTypes.shape({ username: PropTypes.string, score: PropTypes.number }))
};

export default ScoreBoard;


