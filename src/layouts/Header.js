import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';

import { useUserContext } from '../components/utils/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  a: {
    textDecoration: 'none',
    color: ' #fff'
  },
  userBox: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function Header() {
  const classes = useStyles();
  const { user, setUser } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    setUser(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link
              className={classes.a}
              to='/'>
              Food
            </Link>
          </Typography>
          {
            !user
              ?
              <Button color="inherit">
                <Link
                  className={classes.a}
                  to='/login'>
                  Login
                </Link>
              </Button>
              : <Box className={classes.userBox}>
                <Typography>{user}</Typography>
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
            <MenuItem onClick={logout}>LogOut</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}