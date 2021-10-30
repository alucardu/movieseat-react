import React from 'react';

import {IconButton} from '@mui/material';
import ListIcon from '@mui/icons-material/List';

import {DashboardMovieOverviewMenuStyle} from 'Src/styles';
import SortMovieOverview from 'Components/Dashboard/DashboardMovieOverviewMenu/SortMovieOverview/SortMovieOverview';

const DashboardMovieOverviewMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton
        sx={{
          'margin': '-68px 0 0 -12px',
          'position': 'absolute',
        }}
        onClick={handleClick}>
        <ListIcon sx={{'fontSize': '1.5em', 'color': 'white'}}/>
      </IconButton>
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

export default DashboardMovieOverviewMenu;
