import React from 'react';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import {
  Card,
  Fade,
  CardMedia,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  makeStyles,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';

import { calcBusinessHours } from '../../../helpers/calcBusinessHours';
import RatingBar from '../../../components/RatingBar';

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
    textDecoration: 'none',
    display: 'block',
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
  rating: {
    marginTop: -theme.spacing(1),
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
    <Card
      className={classes.card}
      component={Link}
      to={`/storeDetail:${data.storename}-${data.storeId}`}
    >
      <div className={classes.mediaContainer}>
        <LazyLoad height={200} offset={-200} once>
          <Fade in={true} timeout={{ enter: 2000 }}>
            <CardMedia
              image={`${require(`../../../assets/images/login.jpg`)}`}
            />
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
        <RatingBar
          rating={data.star}
          readOnly={true}
          className={classes.rating}
        />
        <Typography>{data.location}</Typography>
        <Typography color="textSecondary">{data.tel}</Typography>
        <Typography color="textSecondary">
          {calcBusinessHours(data.businessHours)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StoreCardView;
