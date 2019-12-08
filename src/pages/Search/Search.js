import React, { useState } from 'react';
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
  Button,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
} from '@material-ui/icons';

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
    // maxWidth: 345,
  },
  cardContent: {
    '& > p, & > div': {
      marginBottom: theme.spacing(0.5),
      marginLeft: theme.spacing(1),
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    position: 'relative',
    '& > div': {
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
    display: 'flex',
    alignItems: 'center',
    marginTop: -theme.spacing(2),
  },
}));

const SearchPage = ({ loading, datas }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const classes = useStyles();

  function judgeIsNewOpen(createdDate) {
    return (new Date() - new Date(createdDate)) / 1000 / 60 / 60 / 24 < 14;
  }

  function calculateDistance() {}

  return loading ? (
    <CircularProgress />
  ) : datas.length === 0 ? null : (
    <Container className={classes.root}>
      <Toolbar>
        <Grid container alignContent="center" className={classes.pageSettings}>
          <IconButton>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography>{pageIndex}</Typography>
          <IconButton>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Toolbar>
      <Grid container justify="flex-start" alignitems="center" spacing={3}>
        {datas.map(data => (
          <Grid key={data.storeId} item md={4} sm={6} xs={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={`${require(`../../assets/images/login.jpg`)}`}
              >
                {judgeIsNewOpen(data.createdDate) ? <div>新上市</div> : null}
              </CardMedia>
              <CardHeader title={data.storename} subheader="這才叫美食" />
              <CardContent className={classes.cardContent}>
                <div className={classes.rating}>
                  <Rating
                    name="read-only"
                    value={data.star}
                    precision={0.1}
                    readOnly
                  />
                  <Typography variant="body1" align="center">
                    {data.star}
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
