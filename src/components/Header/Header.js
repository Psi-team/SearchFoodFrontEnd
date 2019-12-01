import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import SearchInput from '../SearchInput';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#ffb5b5',
    padding: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    font: 'Bold 40px/56px Verdana',
    letterSpacing: '6px',
    textShadow: '5px 3px 10px #00000029',
    color: '#4F576D',
    textDecoration: 'none',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& > a, & > div': {
      color: '#4F576D',
      font: 'Bold 16px/20px Microsoft JhengHei',
      marginLeft: 20,
    },
  },
  userBox: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Header = ({ username, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const matches = useMediaQuery('(min-width:768px)');

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
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {matches ? (
          <Typography className={classes.title} component={Link} to="/">
            Food
          </Typography>
        ) : (
          ''
        )}
        {/* TODO: Using hambarger bar to replace links in mobile mode */}
        <Container className={classes.linkContainer}>
          <SearchInput />
          <Button component={Link} to="/createStore">
            新增餐館
          </Button>
          {!username ? (
            <Button component={Link} to="/login">
              登入
            </Button>
          ) : (
            <Box className={classes.userBox}>
              <Typography>{username}</Typography>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
          )}
        </Container>
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
          onClose={handleClose}
          open={open}
        >
          <MenuItem onClick={handleClick}>LogOut</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProp(state) {
  return { username: state.user.username };
}

const actionCreators = {
  logout: userActions.logout,
};

export default connect(mapStateToProp, actionCreators)(Header);
