import React, { useState, useEffect } from 'react';
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
} from '@material-ui/core';
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
    overflow: 'auto',
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
      transition: theme.transitions.create('all'),
      '&:hover': {
        transform: 'scale(1.1)',
      },
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
  media: {},
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -theme.spacing(2),
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const SearchPage = ({ loading, datas }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const match = useMediaQuery(theme => theme.breakpoints.down('sm'));
  useEffect(() => {
    if (datas.length !== 0) {
      const newRangeDatas = datas.slice(20 * (pageIndex - 1), 20 * pageIndex);
      setCurrentData(newRangeDatas);
    }
  }, [datas, pageIndex]);

  const classes = useStyles();
  function judgeIsNewOpen(createdDate) {
    return (new Date() - new Date(createdDate)) / 1000 / 60 / 60 / 24 < 14;
  }

  function handlePrevpage() {
    if (pageIndex === 0) {
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

  function calculateDistance() {}

  return loading ? (
    <CircularProgress />
  ) : datas.length === 0 ? null : (
    <Container className={classes.root}>
      <Toolbar>
        {match ? (
          ''
        ) : (
          <Grid
            container
            alignContent="center"
            className={classes.pageSettings}
          >
            <IconButton onClick={handlePrevpage}>
              <ArrowBackIosIcon />
            </IconButton>
            <Typography>
              {`${pageIndex}/${Math.ceil(datas.length / 20)}`}
            </Typography>
            <IconButton onClick={handleNextpage}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Grid>
        )}
      </Toolbar>
      <Grid container justify="flex-start" alignitems="center" spacing={3}>
        {currentData.map(data => (
          <Grid key={data.storeId} item md={4} sm={6} xs={12}>
            <Card className={classes.card}>
              <div className={classes.mediaContainer}>
                <CardMedia
                  className={classes.media}
                  image={`${require(`../../assets/images/login.jpg`)}`}
                >
                  {judgeIsNewOpen(data.createdDate) ? <div>新上市</div> : null}
                </CardMedia>
              </div>
              <CardHeader title={data.storename} subheader="這才叫美食" />
              <CardContent className={classes.content}>
                <div className={classes.rating}>
                  <Rating
                    name="read-only"
                    value={data.star}
                    precision={0.1}
                    readOnly
                  />
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
          {calculatePageNumber.map(num => (
            <Button key={num} variant="contained" color="secondary">
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
