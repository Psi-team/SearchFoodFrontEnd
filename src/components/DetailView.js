import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Grid,
  Typography,
  GridList,
  GridListTile,
  Container,
  IconButton,
  Divider,
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@material-ui/icons';

import RatingBar from './RatingBar';

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
  storeInfo: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  rating: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  items: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
    marginBottom: theme.spacing(2),
    '& > p:first-child': {
      marginRight: theme.spacing(2),
    },
  },
  businessHours: {
    display: 'flex',
    fontSize: '',
    '& > p:first-child': {
      marginRight: theme.spacing(2),
    },
    marginBottom: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  bottomLinks: {
    '& > button': {
      float: 'right',
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
    <Grid container spacing={3} className={classes.root} alignItems="stretch">
      <Grid item md={5} sm={12} xs={12} className={classes.mainImage}>
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
      <Grid item md={7} sm={12} xs={12} className={classes.storeInfo}>
        <Typography variant="h2" paragraph>
          {data.storename}
        </Typography>
        <Container>
          <Typography variant="subtitle2" paragraph>
            {data.slogan}
          </Typography>
          <RatingBar
            rating={data.star}
            readOnly={true}
            className={classes.rating}
          />
          <div className={classes.items}>
            <Typography variant="body1">類別: </Typography>
            <Typography variant="body2">{data.type.join(',')}</Typography>
          </div>
          <div className={classes.items}>
            <Typography variant="body1">電話: </Typography>
            <Typography variant="body2">{data.tel}</Typography>
          </div>
          <div className={classes.items}>
            <Typography variant="body1">地址: </Typography>
            <Typography variant="body2">{data.address}</Typography>
          </div>
          <Typography variant="body1" paragraph>
            營業時間:{' '}
          </Typography>
          {Object.entries(data.businessHours).map(([key, val]) => (
            <Container key={key.toString()} className={classes.businessHours}>
              <Typography variant="body2">{key}: </Typography>
              <Typography variant="body2">{val}</Typography>
            </Container>
          ))}
        </Container>
        <Divider />
        {/* TODO: share line and fb or ig link and keep favorate */}
        <Container className={classes.bottomLinks}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Container>
      </Grid>
    </Grid>
  );
};

DetailView.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DetailView;
