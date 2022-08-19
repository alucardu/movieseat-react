
import React, {forwardRef, useState} from 'react';

import {useReactiveVar} from '@apollo/client';

import {ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import {currentUserVar} from 'Src/cache';
import {DashboardMovieOverviewMenuStyle} from 'Src/styles';
import FiltersWatched from './Watched/Filters/Watched';

const Filters = (props, ref) => {
  const currentUser = useReactiveVar(currentUserVar);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = () => {
    if (ref && 'current' in ref && ref.current) {
      setAnchorEl(ref.current);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton disabled={!currentUser.isLoggedIn} onClick={handleClick}>
          <ListItemIcon>
            <TuneIcon fontSize='large'/>
          </ListItemIcon>
          <ListItemText primary="Filters" />
        </ListItemButton>
      </ListItem >

      <DashboardMovieOverviewMenuStyle
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <FiltersWatched handleClose={handleClose} />
      </DashboardMovieOverviewMenuStyle>
    </>
  );
};

export default forwardRef(Filters);
