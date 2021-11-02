import React, {forwardRef} from 'react';

import {useReactiveVar} from '@apollo/client';

import {ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import ListIcon from '@mui/icons-material/List';

import {currentUserVar} from 'Src/cache';
import {DashboardMovieOverviewMenuStyle} from 'Src/styles';
import SortMovieOverview from 'Components/Dashboard/DashboardMovieOverviewMenu/SortMovieOverview/SortMovieOverview';

const DashboardMovieOverviewMenu = (props, ref) => {
  const currentUser = useReactiveVar(currentUserVar);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

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
            <ListIcon fontSize='large'/>
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem >

      <DashboardMovieOverviewMenuStyle
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SortMovieOverview handleClose={handleClose} />
      </DashboardMovieOverviewMenuStyle>
    </>
  );
};

export default forwardRef(DashboardMovieOverviewMenu);
