import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, Grid, Button, makeStyles, Typography, Menu, MenuItem } from '@material-ui/core';
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@material-ui/icons';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles(theme => ({
  pageSettings: {
    '& > p': {
      padding: 16,
    },
  },
}));

const SettingBar = ({ path, length, match, pageIndex, setPageIndex }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [favoriteName, setFavoriteName] = useState('好評');
  const classes = useStyles();

  function handleOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose(e) {
    setFavoriteName(`好評 ${e.target.textContent}`);
    setAnchorEl(null);
  }

  function handlePrevpage() {
    if (pageIndex === 1) {
      return;
    }

    setPageIndex(pageIndex - 1);
  }

  function handleNextpage() {
    if (pageIndex + 1 === length) {
      return;
    }

    setPageIndex(pageIndex + 1);
  }

  return (
    <Toolbar>
      <div>
        <Button variant="contained" color="inherit" onClick={handleOpen}>
          {favoriteName}
        </Button>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>由高到低</MenuItem>
          <MenuItem onClick={handleClose}>由低到高</MenuItem>
        </Menu>
      </div>
      {match ? (
        ''
      ) : (
        <Grid container alignContent="center" className={classes.pageSettings}>
          <Button onClick={handlePrevpage} component={Link} to={`${path}&page=${pageIndex}`}>
            <ArrowBackIosIcon style={{ color: pageIndex === 1 ? grey[400] : grey[700] }} />
          </Button>
          <Typography>{`${pageIndex}/${Math.ceil(length / 20)}`}</Typography>
          <Button
            onClick={handleNextpage}
            disabled={Math.ceil(length / 20) === pageIndex}
            component={Link}
            to={`${path}&page=${pageIndex}`}
          >
            <ArrowForwardIosIcon
              style={{
                color: Math.ceil(length / 20) === pageIndex ? grey[400] : grey[700],
              }}
            />
          </Button>
        </Grid>
      )}
    </Toolbar>
  );
};

SettingBar.propTypes = {};

export default SettingBar;
