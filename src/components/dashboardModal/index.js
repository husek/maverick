import React, { useMemo, Suspense } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress } from '@material-ui/core';


const DeckList = React.lazy(() => import('../deckList'));
const GameList = React.lazy(() => import('../gameList'));
const CreateGame = React.lazy(() => import('../createGame'));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const DashboardModal = ({ view, isOpen, onClose }) => {
  const currentComponent = useMemo(() => {
    if (view === 'decks') return <DeckList />;
    if (view === 'findGame') return <GameList />
    if (view === 'createGame') return <CreateGame />;
    return null;
  }, [view]);

  const modalTitle = useMemo(() => {
    if (view === 'decks') return 'Manage Decks';
    if (view === 'findGame') return 'Join an Existing Game';
    if (view === 'createGame') return 'New Game';
    return null;
  }, [view])


  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">
            {modalTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '5em' }}>
        <Suspense fallback={<CircularProgress />}>
          {currentComponent}
        </Suspense>
      </div>
    </Dialog>
  )
}

DashboardModal.propTypes = {
  view: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default DashboardModal;