import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { deckListSelector } from '../../redux/selectors';
import { loadDeckList } from '../../redux/modules/decks';
import { createGame } from '../../redux/modules/games';
import { useHistory } from 'react-router-dom';


const CreateGame = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const [isCreating, setCreating] = useState(false);
  const [error, _setError] = useState({ deckId: null, gameTitle: null });
  const [selectedDeck, setSelectedDeck] = useState('');
  const [gameTitle, setGameTitle] = useState('New Game');
  const { isLoading, decks } = useSelector(deckListSelector);
  const setError = val => _setError(currentState => ({ ...currentState, ...val }));

  useEffect(() => {
    if (decks.length === 0 && !isLoading) {
      dispatch(loadDeckList());
    }
  }, []);


  const handleSelectDeck = ({ target }) => setSelectedDeck(target.value);
  const handleTitle = ({ target }) => setGameTitle(target.value);

  const handleCreate = () => {
    if (!gameTitle) return setError({ gameTitle: 'Game Title is Required' });
    if (!selectedDeck) return setError({ deckId: 'Deck is Required' });
    setError({ deckId: null, gameTitle: null });

    setCreating(true);
    dispatch(createGame({ deckId: selectedDeck, title: gameTitle }))
      .then(({ _id }) => {
        setCreating(false);
        router.push(`/game/${_id}`)
      }).catch(er => {
      console.error(er);
      setCreating(false);
    });
  };

  if (isCreating) return <CircularProgress />;

  return (
    <React.Fragment>
      <Grid container spacing={2} alignContent="center" style={{ maxWidth: 300, margin: '0 auto' }}>
        <Grid item xs={12}>
          <TextField
            label="Game Title"
            required
            value={gameTitle}
            onChange={handleTitle}
            fullWidth
            helperText={error.gameTitle}
            error={!!error.gameTitle}
          />
        </Grid>

        <Grid item xs={12}>
          {isLoading
            ? <CircularProgress />
            : (
              <FormControl fullWidth error={!!error.deckId}>
                <InputLabel>Select Deck</InputLabel>
                <Select
                  labelId="deck"
                  id="deck"
                  value={selectedDeck}
                  onChange={handleSelectDeck}
                  label="Select Deck"
                >
                  {decks.map(({ _id, deckCount }, index) => (
                    <MenuItem value={_id} key={_id}>Deck {index} - Contains {deckCount} deck(s)</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error.deckId}</FormHelperText>
              </FormControl>
            )}
        </Grid>
        <Grid item xs={12}>
          <Button color="secondary" variant="contained" size="large" fullWidth onClick={handleCreate}>
            Create Game and Join it
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

CreateGame.propTypes = {};

export default CreateGame;