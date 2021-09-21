import {makeStyles} from '@material-ui/styles';
import React, {useState} from 'react';

import ListIcon from '@mui/icons-material/List';
import SortMovieOverview from './SortMovieOverview/SortMovieOverview';

const useStyles = makeStyles({
  menuIcon: {
    'margin': '-48px 0 0 8px',
    'position': 'absolute',
    'fontSize': '2.5em',
    'cursor': 'pointer',
  },

  menuLayoutEL: {
    'position': 'absolute',
    'left': '12px',
    'zIndex': 1,
    'background': '#0fcece',
    'width': '250px',
    'color': '#000',
    '& ul': {
      'padding': '0 12px 0 12px',
      'listStyle': 'none',
      '& li': {
        div: {
          display: 'flex',
        },
      },
    },
  },
});

const MenuLayout = ({toggleMenu}: {toggleMenu:
  React.Dispatch<React.SetStateAction<boolean>>}) => {
  const classes = useStyles();
  return (
    <div className={classes.menuLayoutEL}>
      <ul>
        <li>
          <SortMovieOverview toggleMenu={toggleMenu}/>
        </li>
      </ul>
    </div>
  );
};

const DashboardMovieOverviewMenu = () => {
  const classes = useStyles();
  const [showMenu, toggleMenu] = useState(false);

  return (
    <React.Fragment>
      <ListIcon className={classes.menuIcon} onClick={() => toggleMenu(!showMenu)}/>
      { showMenu ? <MenuLayout toggleMenu={toggleMenu}/> : null }
    </React.Fragment>
  );
};

export default DashboardMovieOverviewMenu;
