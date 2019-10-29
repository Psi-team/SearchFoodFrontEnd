import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Drawer from '../Drawer';
import { useUserContext } from '../../utils/UserContext';
import useUser from '../../hooks/user/useUser';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#ffb5b5'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  a: {
    textDecoration: 'none',
    color: '#fff',
    display: 'inline-block'
  },
  userBox: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function Header() {
  const classes = useStyles();
  const { user } = useUserContext();
  const { logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    handleClose();
    logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Drawer />
          <Typography variant="h6" className={classes.title}>
            <Link
              className={classes.a}
              to='/'>
              Food
            </Link>
          </Typography>
          {
            !user ?
              <Link
                className={classes.a}
                to='/login'>
                <Button color="inherit">
                  Login
                </Button>
              </Link>
              :
              <Box className={classes.userBox}>
                <Typography>{user.username}</Typography>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit">
                  <AccountCircle />
                </IconButton>
              </Box>
          }
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClick}>LogOut</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}