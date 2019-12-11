import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Toolbar,
  Grid,
  Button,
  makeStyles,
  Typography,
  TextField,
  MenuItem,
} from '@material-ui/core';
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
  textField: {
    width: 150,
    '& div': {
      padding: theme.spacing(0.5),
    },
    '& label': {
      transform: 'translate(50%, 50%)',
    },
    '& fieldset': {
      borderWidth: 1,
      borderRadius: 0,
      borderColor: '#000',
    },
  },
  input: {
    color: theme.palette.primary.main,
  },
}));

const SettingBar = ({
  path,
  length,
  match,
  pageIndex,
  setPageIndex,
  sortByStar,
  sortByCreatedDate,
}) => {
  const [filterTarget, setFilterTarget] = useState(null);
  const [favoriteName, setFavoriteName] = useState('');
  const classes = useStyles();

  function handleChange(e) {
    if (e.target.value.indexOf('由高到低') !== -1) {
      sortByStar(1);
    } else {
      sortByStar(-1);
    }
    setFavoriteName(e.target.value);
    setFilterTarget('star');
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

  function handleCreatedDateClick() {
    setFavoriteName('');
    setFilterTarget('createdDate');
    sortByCreatedDate();
  }

  return (
    <Toolbar>
      <Grid container spacing={3} justify="flex-start" alignItems="center" wrap="nowrap">
        <Grid item>
          <Button
            variant="outlined"
            color={filterTarget === 'createdDate' ? 'secondary' : 'inherit'}
            onClick={handleCreatedDateClick}
          >
            新上市
          </Button>
        </Grid>
        <Grid item>
          <TextField
            select
            label={favoriteName === '' ? '星星數' : ''}
            className={classes.textField}
            value={favoriteName}
            onChange={handleChange}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              className: classes.input,
            }}
            variant="outlined"
          >
            <MenuItem value="星星：由高到低">星星：由高到低</MenuItem>
            <MenuItem value="星星：由低到高">星星：由低到高</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      {match ? (
        ''
      ) : (
        <Grid container justify="flex-end" alignContent="center" className={classes.pageSettings}>
          <Button onClick={handlePrevpage} component={Link} to={`${path}&page=${pageIndex}`}>
            <ArrowBackIosIcon style={{ color: pageIndex === 1 ? grey[400] : grey[700] }} />
          </Button>
          <Typography>{`${pageIndex}/${length}`}</Typography>
          <Button
            onClick={handleNextpage}
            disabled={length === pageIndex}
            component={Link}
            to={`${path}&page=${pageIndex}`}
          >
            <ArrowForwardIosIcon
              style={{
                color: length === pageIndex ? grey[400] : grey[700],
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
