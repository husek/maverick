import React, { useEffect, useState } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { deckListSelector } from '../../redux/selectors';
import { CircularProgress, TextField } from '@material-ui/core';
import { loadDeckList, deleteDeck, clearError, createDeck } from '../../redux/modules/decks';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const DeckList = () => {
  const dispatch = useDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [deckCount, _setDeckCount] = useState(1);
  const { isLoading, decks, error } = useSelector(deckListSelector);

  useEffect(() => {
    if (decks.length === 0 && !isLoading) {
      dispatch(loadDeckList());
    }
  }, []);



  const setDeckCount = ({ target }) => {
    if (target.value && target.value > 0 && target.value < 10) {
      _setDeckCount(target.value);
    }
  }
  const toggleCreateDeck = () => setIsCreating(currentState => !currentState);

  const handleDelete = deckId => () => dispatch(deleteDeck(deckId));
  const handleCloseSnackBar = () => dispatch(clearError());

  const handleCreate = () => {
    dispatch(createDeck(deckCount));
    _setDeckCount(1);
    setIsCreating(false);
  }

  if (isLoading) return <CircularProgress />;

  return (
    <React.Fragment>
      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={handleCloseSnackBar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackBar} severity="error">
          {error}
        </MuiAlert>
      </Snackbar>

      <List>
        {isCreating && (
          <React.Fragment>
            <ListItem>
              <Grid container spacing={2} alignContent="center" alignItems="center" justify="space-between">
                <Grid item>
                  <Typography variant="h6">Create Deck a New Deck</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    label="Number of Decks"
                    name="deckCount"
                    type="number"
                    autoFocus
                    value={deckCount}
                    onChange={setDeckCount}
                    tabIndex={0}
                  />
                </Grid>
                <Grid item>
                  <Button aria-label="save" color="secondary" variant="contained" size="large" onClick={handleCreate}>
                    <SaveIcon /> Save
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </React.Fragment>
        )}
        {decks.map(({ _id, deckCount }) => (
          <React.Fragment key={_id}>
            <ListItem>
              <ListItemText primary={`Decks combined: ${deckCount}`} secondary={_id} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={handleDelete(_id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Fab color="primary" aria-label="add" onClick={toggleCreateDeck} style={{ position: 'absolute', bottom: '0.5em', right: '0.5em' }}>
        <AddIcon />
      </Fab>
    </React.Fragment>
  )
}

DeckList.propTypes = {};

export default DeckList;