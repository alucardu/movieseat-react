import React from 'react';

import {IconButton, Typography, Box, Modal, Fade, Backdrop} from '@mui/material/';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {MovieModalStyle} from 'Src/styles';

export const MovieModal = (props) => {
  const movie = {...props}.movie;

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
          <MovieModalStyle movie={movie}>
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
            <IconButton className='closeBtn' onClick={handleClose}>
              <HighlightOffIcon />
            </IconButton>
          </MovieModalStyle>
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
