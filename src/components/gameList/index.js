import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { gameListSelector } from '../../redux/selectors';
import { loadGameList } from '../../redux/modules/games';


const GameList = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const { isLoading, games } = useSelector(gameListSelector);

  useEffect(() => {
    if (games.length === 0 && !isLoading) {
      dispatch(loadGameList());
    }
  }, []);

  const joinGame = id => () => router.push(`/game/${id}`);

  if (isLoading) return <CircularProgress />;

  return (
    <React.Fragment>
      <List>
        {games.map(({ _id, title, players }) => (
          <React.Fragment key={_id}>
            <ListItem button onClick={joinGame(_id)}>
              <ListItemText primary={title} secondary={`${players.length} Players`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </React.Fragment>
  )
}

export default GameList;