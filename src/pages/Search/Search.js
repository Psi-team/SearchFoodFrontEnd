import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  makeStyles,
  CircularProgress,
  Container,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  CardActions,
  Typography,
  Toolbar,
  useMediaQuery,
  Button,
  Fade,
  Avatar,
} from '@material-ui/core';
import { red, grey } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@material-ui/icons';

import { calculatePageNumber } from './calculatePageNumber';

const useStyles = makeStyles(theme => ({
  root: {
    // overflow: 'auto',
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
  media: {},
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

const SearchPage = ({ loading, datas }) => {
  const [currentData, setCurrentData] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [pageIndex, setPageIndex] = useState(Number(params.get('page')) || 1);
  const match = useMediaQuery(theme => theme.breakpoints.down('sm'));
  useEffect(() => {
    if (datas.length !== 0) {
      const newRangeDatas = datas.slice(20 * (pageIndex - 1), 20 * pageIndex);
      setCurrentData(newRangeDatas);
    }
  }, [datas, pageIndex]);

  useEffect(() => {
    if (match) {
      console.log(datas);
      setCurrentData(datas);
    }
  }, [match, datas]);

  const classes = useStyles();
  function judgeIsNewOpen(createdDate) {
    return (new Date() - new Date(createdDate)) / 1000 / 60 / 60 / 24 < 14;
  }

  function handlePrevpage() {
    if (pageIndex === 1) {
      return;
    }

    setPageIndex(pageIndex - 1);
  }

  function handleNextpage() {
    if (pageIndex + 1 === datas.length) {
      return;
    }

    setPageIndex(pageIndex + 1);
  }

  function handleNumberClick(num) {
    setPageIndex(num);
    window.scrollTo(0, 0);
  }

  function calculateDistance() {}

  return loading ? (
    <CircularProgress />
  ) : datas.length === 0 ? null : (
    <Container className={classes.root}>
      <Toolbar>
        {match ? (
          ''
        ) : (
          <Grid container alignContent="center" className={classes.pageSettings}>
            <Button
              onClick={handlePrevpage}
              component={Link}
              to={`/search${location.search.split('&page')[0]}&page=${pageIndex}`}
            >
              <ArrowBackIosIcon style={{ color: pageIndex === 1 ? grey[400] : grey[700] }} />
            </Button>
            <Typography>{`${pageIndex}/${Math.ceil(datas.length / 20)}`}</Typography>
            <Button
              onClick={handleNextpage}
              disabled={Math.ceil(datas.length / 20) === pageIndex}
              component={Link}
              to={`/search${location.search.split('&page')[0]}&page=${pageIndex}`}
            >
              <ArrowForwardIosIcon
                style={{
                  color: Math.ceil(datas.length / 20) === pageIndex ? grey[400] : grey[700],
                }}
              />
            </Button>
          </Grid>
        )}
      </Toolbar>
      <Grid container justify="flex-start" alignitems="center" spacing={3}>
        {currentData.map(data => (
          <Grid key={data.storeId} item lg={3} md={4} sm={6} xs={12}>
            <Card className={classes.card}>
              <div className={classes.mediaContainer}>
                <LazyLoad height={200} offset={-200} once>
                  <Fade in={true} timeout={{ enter: 2000 }}>
                    <CardMedia
                      className={classes.media}
                      image={`https://picsum.photos/id/${Math.floor(Math.random() * 299) +
                        1}/200/300`}
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
                <div className={classes.rating}>
                  <Rating name="read-only" value={data.star} precision={0.1} readOnly />
                  <Typography variant="body1" align="center">
                    {data.star.toFixed(1)}
                  </Typography>
                </div>
                <Typography>{data.location}</Typography>
                <Typography color="textSecondary">{data.tel}</Typography>
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
          </Grid>
        ))}
      </Grid>
      {match ? (
        ''
      ) : (
        <Toolbar className={classes.bottomBar}>
          {calculatePageNumber(pageIndex, Math.ceil(datas.length / 20)).map((num, idx) => (
            <Button
              key={idx}
              onClick={() => handleNumberClick(num)}
              component={Link}
              to={`/search${location.search.split('&page')[0]}&page=${num}`}
              variant="contained"
              color={pageIndex === num ? 'secondary' : 'inherit'}
              disabled={isNaN(num)}
            >
              {num}
            </Button>
          ))}
        </Toolbar>
      )}
    </Container>
  );
};

SearchPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  datas: PropTypes.array.isRequired,
};

function mapStateToProp(state) {
  return {
    loading: state.searchStore.loading,
    datas: state.searchStore.datas,
  };
}

export default connect(mapStateToProp)(SearchPage);
