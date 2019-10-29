import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@material-ui/core';
import { Search as SearchIcon, Menu as MenuIcon } from '@material-ui/icons/';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto',
  },
  a: {
    textDecoration: 'none',
    color: '#666'
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <Link to='/search' className={classes.a}>
          <ListItem button key='Search Food'>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary='Search Food' />
          </ListItem>
          <Divider />
        </Link>
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer('left', true)}
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu">
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}