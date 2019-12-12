import React from 'react';
import LazyLoad from 'react-lazyload';
import {
  Card,
  Fade,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import Rating from '@material-ui/lab/Rating';
import { Favorite as FavoriteIcon, Share as ShareIcon } from '@material-ui/icons';

import { calcBusinessHours } from '../../../helpers/calcBusinessHours';
function judgeIsNewOpen(createdDate) {
  return (new Date() - new Date(createdDate)) / 1000 / 60 / 60 / 24 < 14;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
  pageSettings: {
    '& > p': {
      padding: 16,
    },
  },
  card: {
    transition: theme.transitions.create('all'),
    boxSizing: 'border-box',
    '&:hover': {
      // because background image size is 16:9, so the border should be the same.
      borderWidth: '2.8124px 5px',
      borderColor: theme.palette.secondary.main,
      borderStyle: 'solid',
      cursor: 'pointer',
    },
  },
  content: {
    '& > p, & > div': {
      marginBottom: theme.spacing(0.5),
      marginLeft: theme.spacing(1),
    },
  },
  mediaContainer: {
    position: 'relative',
    overflow: 'hidden',

    '& > div:first-child': {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    '& > div:nth-child(2)': {
      position: 'absolute',
      top: '20%',
      left: 0,
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      padding: theme.spacing(0.5),
      letterSpacing: theme.spacing(0.5),
    },
  },
  cardHeader: {
    flexDirection: 'row-reverse',
    '& > div:first-child': {
      display: 'flex',
    },
  },
  avatar: {
    backgroundColor: red[500],
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -theme.spacing(2),
    '& > p': {
      letterSpacing: theme.spacing(0.1),
    },
  },
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

const StoreCardView = ({ data }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.mediaContainer}>
        <LazyLoad height={200} offset={-200} once>
          <Fade in={true} timeout={{ enter: 2000 }}>
            <CardMedia image={`${require(`../../../assets/images/login.jpg`)}`} />
          </Fade>
        </LazyLoad>
        {judgeIsNewOpen(data.createdDate) && <div>新上市</div>}
      </div>
      <CardHeader
        className={classes.cardHeader}
        title={data.storename}
        subheader="這才叫美食"
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data.tags[0]}
          </Avatar>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.rating}>
          <Rating name="read-only" value={data.star} precision={0.1} readOnly />
          <Typography variant="body1" align="center">
            {data.star.toFixed(1)}
          </Typography>
        </div>
        <Typography>{data.location}</Typography>
        <Typography color="textSecondary">{data.tel}</Typography>
        <Typography color="textSecondary">{calcBusinessHours(data.businessHours)}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StoreCardView;
