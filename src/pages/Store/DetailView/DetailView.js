import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Typography,
  GridList,
  GridListTile,
} from '@material-ui/core';

import RatingBar from '../../../components/RatingBar';

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: 'border-box',
    padding: `${theme.spacing(2)}px 0px`,
  },
  mainImage: {
    '& > img': {
      width: '100%',
    },
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    '& > p': {
      letterSpacing: theme.spacing(0.1),
    },
  },
}));

const DetailView = ({ data }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const classes = useStyles();

  function changeMainPic(idx) {
    setImgIndex(idx);
  }

  return (
    <Grid container alignItems="center" spacing={3} className={classes.root}>
      <Grid item md={7} sm={12} className={classes.mainImage}>
        <img src={data.pictures[imgIndex]} alt="store" />
        <GridList className={classes.gridList} cols={2}>
          {data.pictures.map((tile, idx) => (
            <GridListTile
              key={tile.toString()}
              onClick={() => changeMainPic(idx)}
            >
              <img src={tile} alt="shop" />
            </GridListTile>
          ))}
        </GridList>
      </Grid>
      <Grid item md={5} sm={12}>
        <Typography variant="h1">{data.storename}</Typography>
        <Typography variant="subtitle1">{data.type.join(',')}</Typography>
        <RatingBar rating={data.star} readOnly={true} />
      </Grid>
    </Grid>
  );
};

DetailView.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DetailView;
