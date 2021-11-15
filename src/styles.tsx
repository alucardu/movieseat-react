import {ListItem, Box, styled, Modal, Popover, Button, Input, List, FormGroup, alpha} from '@mui/material';
import {Theme, CSSObject} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {grey, orange, purple} from '@mui/material/colors';
import {IMovie} from 'Src/movieseat';

import GradeIcon from '@mui/icons-material/Grade';
const imagePath = 'https://image.tmdb.org/t/p/w780/';

export const ProfileBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(1),
  },
  'width': 'fit-content',
  'display': 'flex',
  'flexDirection': 'column',
  'padding': theme.spacing(1),
  'color': theme.palette.text.primary,
  'backgroundColor': grey[50],
  'borderRadius': theme.spacing(0.5),
  'marginBottom': theme.spacing(1),
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
    [theme.breakpoints.down('md')]: {
      color: 'white',
    },
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
  'overflow': 'hidden',
  '& img': {
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      zIndex: 4,
    },
  },
  '&.hover': {
    [theme.breakpoints.up('sm')]: {
      'flexGrow': 1.3,
    },
    'backgroundColor': '#414141',
    '&>div': {
      right: 0,
    },
  },
  '&.filler': {
    background: 'transparent',
  },
}));

export const MovieContainerOverlay = styled(Box)(({theme}) => ({
  'transition': 'all 0.2s ease',
  'position': 'absolute',
  'right': 0,
  'top': '0',
  'height': '100%',
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'flex-end',
  'justifyContent': 'center',
  'zIndex': 3,
  '& svg': {
    color: 'white',
    fontSize: '1em',
  },
  [theme.breakpoints.down('sm')]: {
    backgroundColor: alpha(grey[900], 0.75),
    right: '-48px',
  },
}));

export const Onboarding = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '40vh',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary,
}));

export const RandomBackgroundContainer = styled(Box)(() => ({
  'height': '100vh',
  'width': '200vw',
  'position': 'fixed',
  'top': 0,
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
  position: 'fixed',
  zIndex: 2,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
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
  'zIndex': 7,
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


export const ResultListBackground = styled(Box)(({theme}) => ({
  '&.searchActive': {
    position: 'fixed',
    top: 0,
    zIndex: 6, display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: alpha(grey[900], 0.5),
  },
}));


type SearchEL = {
  searchel: HTMLElement
};

export const ResultList = styled(List)<SearchEL>(({theme, searchel}) => ({
  'background': '#3a3a3a',
  'position': 'absolute',
  'top': searchel?.offsetTop + searchel?.offsetHeight + 'px',
  'zIndex': 7,
  'listStyle': 'none',
  'boxSizing': 'border-box',
  'margin': '0',
  'padding': '0',
  'display': 'flex',
  'flexDirection': 'column',
  [theme.breakpoints.down('sm')]: {
    maxHeight: 'calc(100vh - 130px)',
  },
  'maxHeight': '80vh',
  'overflowY': 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: grey[500],
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.primary.main,
  },
  '.noResults': {
    height: '68px',
  },
  '.posterNotFound': {
    width: '45px',
    height: '68px',
  },
}));

type IResultListItem = {
  movie: IMovie,
  height: number
}

export const ResultListItemStyle = styled(ListItem)<IResultListItem>(({theme, movie, height}) => ({
  'minHeight': '64px',
  'padding': '8px',
  'display': 'flex',
  'flexDirection': 'column',
  'alignItems': 'center',
  'position': 'relative',
  'transition': 'all 0.2s',
  'background': grey[800],
  '&::after': {
    content: '""',
    width: '100%',
    height: '100%',
    backgroundImage: `url(${imagePath + movie.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    zIndex: -1,
    left: 0,
    top: 0,
  },
  'div': {
    'color': 'white',
    'transition': 'all 0.2s',
    'width': '100%',
    'display': 'flex',
    'flexDirection': 'column',
    'h1': {
      textShadow: '#000 1px 0 5px',
      fontSize: '16px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      padding: 0,
      margin: 0,
      fontWeight: 'normal',
    },
    'h2': {
      textShadow: '#000 1px 0 5px',
      color: grey[500],
      fontSize: '12px',
      padding: 0,
      margin: 0,
      fontWeight: 'normal',
    },
    'p': {
      margin: '0 0 8px 0',
      textShadow: '#000 1px 0 5px',
    },
  },
  'img': {
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 1,
    transition: 'all 0.2s',
    maxHeight: '64px',
  },
  '&:nth-of-type(even)': {
    background: '#484848',
  },
  '&.hover': {
    'background': alpha(grey[900], 0.25),
    'minHeight': height,
    'h1': {
      'transition': 'all 0.2s',
      'fontSize': '24px',
    },
    'img': {
      'opacity': 0,
    },
    'button': {
      width: 'fit-content',
    },
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
  'padding': '8px',
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
  zIndex: 999,
}));

export const A2hsStyles = styled(Box)(({theme}) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  'position': 'fixed',
  'bottom': 'calc(0px - 80px)',
  'zIndex': 3,
  'color': 'white',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'center',
  'height': '64px',
  'backgroundColor': theme.palette.primary.main,
  'width': '94%',
  'borderRadius': theme.spacing(1),
  'marginLeft': '3%',
  'marginBottom': '3%',
  'transition': 'all 0.6s',
  '&.animation': {
    bottom: '0px',
  },
}));

export const MovieDetailsStyle = styled(Box)<MovieModalProps>(({theme, movie}) => ({
  'width': '100vw',
  'color': theme.palette.text.secondary,
  '.backdrop_container': {
    'position': 'relative',
    '&::after': {
      content: `""`,
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      background: 'linear-gradient(0deg, #212121 0%, rgba(0,0,0,0) 80%)',
    },
  },
}));
