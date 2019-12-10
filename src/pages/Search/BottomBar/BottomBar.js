import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, Button, makeStyles } from '@material-ui/core';

import { calculatePageNumber } from '../../../helpers/calculatePageNumber';

const useStyles = makeStyles(theme => ({
  bottomBar: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > button': {
      margin: theme.spacing(0.5),
    },
  },
}));

const BottomBar = ({ pageIndex, length, path, setPageIndex }) => {
  const classes = useStyles();
  function handleNumberClick(num) {
    setPageIndex(num);
    window.scrollTo(0, 0);
  }

  return (
    <Toolbar className={classes.bottomBar}>
      {calculatePageNumber(pageIndex, Math.ceil(length / 20)).map((num, idx) => (
        <Button
          key={idx}
          onClick={() => handleNumberClick(num)}
          component={Link}
          to={`${path}&page=${num}`}
          variant="contained"
          color={pageIndex === num ? 'secondary' : 'inherit'}
          disabled={isNaN(num)}
        >
          {num}
        </Button>
      ))}
    </Toolbar>
  );
};

BottomBar.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  setPageIndex: PropTypes.func.isRequired,
};

export default BottomBar;