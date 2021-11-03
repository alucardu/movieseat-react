import {ListItem, Box, styled, Modal, Popover, Button, Input, List, FormGroup} from '@mui/material';
import {Theme, CSSObject} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {grey, orange, purple} from '@mui/material/colors';
import {IMovie} from 'Src/movieseat';

import GradeIcon from '@mui/icons-material/Grade';

export const ProfileBox = styled(Box)(({theme}) => ({
  'display': 'flex',
  'flexDirection': 'column',
  'margin': theme.spacing(2),
  'padding': theme.spacing(1),
  'color': theme.palette.text.primary,
  'backgroundColor': grey[50],
  'borderRadius': theme.spacing(0.5),
  '.MuiListItem-root': {
    'display': 'flex',
    'justifyContent': 'space-between',
    'borderBottom': `1px solid ${grey[300]}`,
    'borderRadius': theme.shape.borderRadius,
    '& a': {
      transition: 'margin-left 0.1s ease-in',
    },
    '&:hover': {
      'background': theme.palette.primary.light,
      '&> a': {
        marginLeft: theme.spacing(0.5),
      },
    },
  },
}));

export const Logo = styled(Box)(({theme}) => ({
  'fontSize': '2em',
  'fontFamily': 'Oleo Script Swash Caps',
  'background': 'transparent',
  'border': 'none',
  'marginLeft': theme.spacing(1),
  'width': '41px',
  'overflow': 'hidden',
  'transition': 'all 0.1s ease-out',
  'cursor': 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
  },
  '&.open': {
    paddingLeft: '8px',
    width: '100%',
  },
  [theme.breakpoints.down('md')]: {
    color: 'white',
  },
}));

export const MovieOverviewList = styled(List)(() => ({
  'display': 'flex',
  'li:last-child': {
    margin: '0 0 8px 0',
  },
}));

export const MovieContainer = styled(ListItem)(({theme}) => ({
  'borderRadius': theme.spacing(1),
  'width': 'auto',
  'transition': 'all 0.25s ease',
  'flexGrow': 1,
  'flexBasis': 0,
  'position': 'relative',
  'margin': '0 8px 8px 0',
  '& img': {
    borderRadius: theme.shape.borderRadius,
  },
  '&.hover': {
    'flexGrow': 1.5,
    'backgroundColor': '#414141',
  },
  '&.filler': {
    background: 'transparent',
  },
}));

export const MovieContainerOverlay = styled(Box)(({theme}) => ({
  'position': 'absolute',
  'right': 0,
  'top': '0',
  'height': '100%',
  'paddingRight': theme.spacing(1),
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'flex-end',
  'justifyContent': 'center',
  '& svg': {
    color: 'white',
    fontSize: '1em',
  },
}));

export const Onboarding = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '40vh',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const RandomBackgroundContainer = styled(Box)(() => ({
  'height': '100vh',
  'width': '200vw',
  'position': 'relative',
  'overflow': 'hidden',
  'marginLeft': '-100vw',
  'transition': 'margin-left 1s ease-in',
  '&.slide': {
    marginLeft: '0vw',
  },
}));

export const RandomBackgroundSlider = styled(Box)(() => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'absolute',
  height: '100vh',
  width: '100vw',
}));

type MovieModalProps = {
  movie: IMovie
};

export const MovieModalStyle = styled(Box)<MovieModalProps>(({theme, movie}) => ({
  'color': theme.palette.getContrastText('#000'),
  'position': 'absolute' as 'absolute',
  'top': '50%',
  'left': '50%',
  'transform': 'translate(-50%, -50%)',
  'width': '770px',
  'height': '410px',
  'boxShadow': theme.spacing(3),
  'borderRadius': theme.shape.borderRadius,
  'padding': theme.spacing(1),
  'background': `url(${'https://image.tmdb.org/t/p/w780/' + movie.backdrop_path})`,
  'backgroundRepeat': 'no-repeat',
  'backgroundSize': 'cover',
  '&::after': {
    'content': `""`,
    'backgroundColor': grey[900],
    'opacity': '0.7',
    'top': 0,
    'left': 0,
    'bottom': 0,
    'right': 0,
    'position': 'absolute',
    'zIndex': -1,
    'borderRadius': theme.shape.borderRadius,
  },
  '.closeBtn': {
    'color': theme.palette.getContrastText('#000'),
    'position': 'absolute',
    'top': 0,
    'right': 0,
    '& svg': {
      fontSize: theme.typography.h4,
    },
  },
}));

export const Rating = styled(GradeIcon)(() => ({
  '&.ratingHover': {
    color: orange[500],
  },
}));

export const LoginModal = styled(Modal)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const LoginFormContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  background: 'linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)',
}));

export const LoginCheckBody = styled(Box)(() => ({
  'background': '#fff',
  'width': '14rem',
  'height': '2.8rem',
  'margin': '8rem 0 8rem 4rem',
  'transform': 'rotate(-45deg)',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '100%',
    width: '2.8rem',
    height: '5.2rem',
    background: '#fff',
    boxShadow: 'inset -0.2rem -2rem 2rem rgb(0 0 0 / 20%)',
  },
}));

export const LoginFormBody = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const NotificationMenu = styled(Popover)(() => ({
  'left': '8px',
  'top': '104px',
  '.MuiListItem-root': {
    'display': 'flex',
    'justifyContent': 'space-between',
    'borderBottom': '1px solid #ebebeb',
    'height': '64px',
    '& p': {
      transition: 'margin-left 0.1s ease-in',
    },
    '&:hover': {
      'background': '#f6e0fa',
      '&> p': {
        marginLeft: '4px',
      },
    },
  },
  '& .profileIcon': {
    fontSize: '4rem',
  },
  '& .watched': {
    background: '#ffffff',
  },
}));

export const NumberOfUnreadNotificationsStyle = styled('span')(({theme}) => ({
  borderRadius: '50%',
  background: theme.palette.primary.main,
  color: 'white',
  width: '1.6em',
  height: '1.6em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: '4em',
  bottom: '3em',
  fontWeight: 'bold',
  fontSize: '0.6rem',
}));
export const AddMovieFromSearchOverlay = styled(Box)<MovieModalProps>(({theme, movie}) => ({
  'position': 'absolute',
  'width': '100%',
  'height': '100%',
  'left': 0,
  'background': movie.backdrop_path ? `url(${'https://image.tmdb.org/t/p/w780/' + movie.backdrop_path}) no-repeat center center` : '#4d4d4d',
  'backgroundSize': 'cover',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
}));

export const MovieSearchInput = styled(Input)(({theme}) => ({
  'background': grey[100],
  'color': grey[900],
  'fontSize': '16px',
  'borderRadius': theme.shape.borderRadius,
  'padding': '0',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  'width': '50%',
  '& input': {
    'height': '64px',
    'padding': 0,
    'paddingLeft': theme.spacing(1),
    'border': 'none',
  },
}));

export const AddMovieFromSearchButton = styled(Button)(({theme}) => ({
  'color': 'white',
  'background': purple[600],
  'height': '70%',
  'width': '70%',
  '&:hover': {
    backgroundColor: purple[300],
  },
}));

type SearchEL = {
  searchEl: HTMLElement
};

export const ResultList = styled(Box)<SearchEL>(({theme, searchEl}) => ({
  'background': '#3a3a3a',
  'position': 'absolute',
  'top': searchEl?.offsetTop + searchEl?.offsetHeight + 'px',
  'width': searchEl?.offsetWidth,
  'zIndex': 1,
  'listStyle': 'none',
  'boxSizing': 'border-box',
  'margin': '0',
  'padding': '0',
  'maxHeight': '80vh',
  'overflowY': 'scroll',
  '& li': {
    'padding': '0 0px 0 8px',
    'display': 'flex',
    'alignItems': 'center',
    'position': 'relative',
    '> & :hover': {
      cursor: 'pointer',
      background: '#0fcece',
    },
    '& p': {
      'width': 'calc(98% - 45px)',
      'display': 'flex',
      'flexDirection': 'column',
      'span:nth-of-type(1)': {
        color: 'white',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      '& spannth-of-type(2)': {
        fontSize: '12px',
        color: '#929292',
      },
    },
    '& img': {
      marginLeft: 'auto',
    },
  },
  '.noResults': {
    height: '68px',
  },
  '.posterNotFound': {
    width: '45px',
    height: '68px',
  },
}));

export const DashboardMovieOverviewMenuStyle = styled(Popover)(() => ({
  'left': '8px',
  'top': '244px',
  '.MuiPaper-root': {
    padding: 0,
    background: '#0fcece',
  },
}));

export const DashboardMovieOverMenuEl = styled(FormGroup)(() => ({
  'width': '250px',
  'padding': '16px',
  '& ul': {
    'margin': 0,
    'listStyle': 'none',
    '& li': {
      div: {
        display: 'flex',
      },
    },
  },
}));

export const FancyButton = styled(Button)(() => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
}));

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: drawerWidth,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Drawer = styled(MuiDrawer)(
    ({theme, open}) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
);

export const HeaderStyle = styled(Box)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.default,
  zIndex: 2,
}));

export const A2hsStyles = styled(Box)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  position: 'fixed',
  marginTop: 'calc(100vh - 64px)',
  zIndex: 3,
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '64px',
  backgroundColor: 'white',
  width: '100%',
  padding: '8px',
}));
