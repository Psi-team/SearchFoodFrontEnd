import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  makeStyles,
  Grid,
  Typography,
  GridList,
  GridListTile,
  Container,
  IconButton,
  Divider,
  useMediaQuery,
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@material-ui/icons';

import { userActions } from '../../redux/actions';
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
    padding: `${theme.spacing(2)}px ${theme.spacing(5)}px 0px`,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      padding: `${theme.spacing(2)}px 0px`,
    },
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    cursor: 'pointer',
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

const DetailView = ({ data, addFavorite, removeFavorite }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [swipe, setSwipe] = useState(0);
  const imgs = useRef(
    data.pictures.length === 0
      ? [
          'https://picsum.photos/id/235/800/450',
          'https://picsum.photos/id/236/800/450',
          'https://picsum.photos/id/237/800/450',
        ]
      : data.pictures
  );
  const [isFavorite, setIsFavorite] = useState(data.isFavorite);
  const classes = useStyles();
  const match = useMediaQuery(theme => theme.breakpoints.down('xs'));

  const changeMainPic = idx => {
    setImgIndex(idx);
  };

  const touchStart = e => {
    setSwipe(e.touches[0].clientX);
  };

  const touchEnd = e => {
    e.preventDefault();
    const { clientX } = e.changedTouches[0];
    if (clientX < swipe && imgIndex + 1 !== imgs.current.length) {
      changeMainPic(imgIndex + 1);
    } else if (clientX > swipe && imgIndex !== 0) {
      changeMainPic(imgIndex - 1);
    }
  };

  const toggleFavorite = shop => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      // remove
      removeFavorite(shop.storeId);
    } else {
      // add
      const copyShop = JSON.parse(JSON.stringify(shop));
      delete copyShop.comments;
      copyShop.pictures = copyShop.pictures[0];
      addFavorite(copyShop);
    }
  };

  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item lg={6} md={6} sm={12} xs={12} className={classes.mainImage}>
        {match ? (
          <>
            <img
              src={imgs.current[imgIndex]}
              alt="store"
              onTouchStart={touchStart}
              onTouchEnd={touchEnd}
            />
            <Typography align="right" variant="body2" color="textSecondary">
              {imgIndex + 1}/{imgs.current.length}
            </Typography>
          </>
        ) : (
          <>
            <img src={imgs.current[imgIndex]} alt="store" />
            <GridList className={classes.gridList} cols={2}>
              {imgs.current.map((tile, idx) => (
                <GridListTile
                  key={tile.toString()}
                  onClick={() => changeMainPic(idx)}
                >
                  <img src={tile} alt="shop" />
                </GridListTile>
              ))}
            </GridList>
          </>
        )}
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12} className={classes.storeInfo}>
        <Typography variant="h3" paragraph>
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
            <Typography variant="body2">{data.tags.join(',')}</Typography>
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
        {/* TODO: share line and fb or ig link*/}
        <Container className={classes.bottomLinks}>
          <IconButton
            className={classes.favorite}
            aria-label="add to favorites"
            onClick={() => toggleFavorite(data)}
            style={{ color: isFavorite ? '#E63F00' : '#888888' }}
          >
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
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

const actionCreator = {
  addFavorite: userActions.addFavorite,
  removeFavorite: userActions.removeFavorite,
};

export default connect(null, actionCreator)(DetailView);
