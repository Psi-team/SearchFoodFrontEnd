import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Hidden,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';
import { connect } from 'react-redux';

import { userActions } from '../../actions';
import SearchInput from '../SearchInput';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '15vh',
    '& > div': {
      width: 'auto', //TODO:先暫時設置400
      minWidth: 400,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        minWidth: 'auto',
      },
    },
  },
  title: {
    // flexGrow: 1,
    font: 'Bold 40px/56px Verdana',
    textShadow: '5px 3px 10px #00000029',
    textDecoration: 'none',
  },
  button: {
    '& > span': {
      fontWeight: 550,
      fontSize: '1.2rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.8rem',
      },
    },
  },
}));

const Header = ({ username, logout }) => {
  const classes = useStyles();
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
    <AppBar position="static" color="secondary">
      <Toolbar className={classes.toolbar}>
        <Hidden xsDown>
          <Typography
            className={classes.title}
            component={Link}
            to="/"
            color="inherit"
          >
            Food
          </Typography>
        </Hidden>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
          spacing={2}
        >
          <Grid item xs={10}>
            <SearchInput />
          </Grid>
          <Grid
            container
            wrap="nowrap"
            item
            xs={2}
            alignItems="center"
            justify="flex-end"
          >
            {!username ? (
              <Button
                className={classes.button}
                component={Link}
                to="/login"
                color="inherit"
              >
                登入
              </Button>
            ) : (
              <>
                <Hidden smDown>
                  <Grid item xs={7}>
                    <Typography variant="subtitle1">{username}</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <IconButton onClick={handleMenu} color="inherit">
                      <AccountCircle />
                    </IconButton>
                  </Grid>
                </Hidden>
                <Hidden mdUp>
                  <Grid item container justify="flex-end">
                    <IconButton onClick={handleMenu} color="inherit">
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                </Hidden>
              </>
            )}
          </Grid>
        </Grid>
        <Menu
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
          <MenuItem onClick={handleClose}>個人檔案</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/createStore">
            新增餐館
          </MenuItem>
          <MenuItem onClick={handleClick}>登出</MenuItem>
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
