import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import {useQuery, useMutation} from '@apollo/client';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {makeStyles} from '@mui/styles';
import {Box, List, ListItem, Popover} from '@mui/material';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import resolvers from 'Src/resolvers';
import {snackbarVar} from 'Src/cache';

const useStyles = makeStyles({
  ListItemRoot: {
    'display': 'flex',
    'justifyContent': 'space-between',
    'borderBottom': '1px solid #ebebeb',
    'borderRadius': '4px',
    '& a': {
      transition: 'margin-left 0.1s ease-in',
    },
    '&:hover': {
      'background': '#f6e0fa',
      '&> a': {
        marginLeft: '4px',
      },
    },
  },
});

export const FollowedUsers = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const classes = useStyles();
  const {error, loading, data: {returnFollowedUsers: followedUsers} = {}} = useQuery(resolvers.queries.ReturnFollowedUsers);

  const [unfollowUserMutation] = useMutation(resolvers.mutations.UnfollowUser);

  const unfollowUser = async (user) => {
    await unfollowUserMutation({
      variables: {id: user.id},
      update: (cache, {data}) => {
        cache.modify({
          fields: {
            returnFollowedUsers: () => {
              return [...data.unfollowUser];
            },
          },
        });
      },
    }).then(() => {
      snackbarVar({message: 'Unfollowed ' + user.user_name, severity: 'success'});
    });
  };


  if (loading) return (<div>loading</div>);
  if (error) return (<div>error</div>);

  return (
    <Box className='profileBox'>
      <Typography variant='h6'>
        Followed users
      </Typography>

      <List data-cy='list_followed_users'>
        {followedUsers.map((user) => {
          return (
            <ListItem key={user.id} classes={{root: classes.ListItemRoot}}>
              <Link to={`/profile/${user.id}`}>{user.user_name}</Link>
              <IconButton onClick={handleClick}> <DeleteForeverIcon /></IconButton>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box sx={{padding: '16px'}}>
                  <Typography>Are you sure you want to stop following <b>{user.user_name}</b>?</Typography>
                  <IconButton onClick={() => {
                    unfollowUser(user);
                  }}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={handleClose}>
                    <ClearIcon />
                  </IconButton>
                </Box>
              </Popover>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
