import React from 'react';

import {IconButton, Typography, Box, Modal, Fade, Backdrop} from '@mui/material/';
import {makeStyles} from '@mui/styles';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const useStyles = makeStyles({
  closeBtn: {
    'color': 'white',
    'position': 'absolute',
    'top': 0,
    'right': 0,
    '& svg': {
      fontSize: '2rem',
    },
  },
});

export const MovieModal = (props) => {
  const movie = {...props}.movie;
  const classes = useStyles();

  const style = {
    'position': 'absolute' as 'absolute',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'width': '770px',
    'height': '410px',
    'bgcolor': '#000000b3',
    'boxShadow': 24,
    'borderRadius': '8px',
    'p': 4,
    '&::after': {
      'content': `""`,
      'background': `url(${'https://image.tmdb.org/t/p/w780/' + movie.backdrop_path})`,
      'backgroundRepeat': 'no-repeat',
      'backgroundSize': 'cover',
      'opacity': '0.3',
      'top': 0,
      'left': 0,
      'bottom': 0,
      'right': 0,
      'position': 'absolute',
      'zIndex': -1,
      'borderRadius': '8px',
    },
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ModalContainer = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {movie.original_title}
            </Typography>
            <Typography variant='body1'>
              {movie.tagline}
            </Typography>
            <Typography id="transition-modal-description" variant='body2' sx={{mt: 2}}>
              {movie.overview}
            </Typography>
            <Typography variant='body2'>
              {movie.runtime}
            </Typography>
            <IconButton className={classes.closeBtn} onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        </Fade>
      </Modal>
    );
  };


  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <LocalMoviesIcon />
      </IconButton>
      <ModalContainer />
    </Box>
  );
};
