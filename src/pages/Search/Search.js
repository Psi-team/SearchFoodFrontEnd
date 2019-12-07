import React from 'react';
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
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'auto',
    height: '100%',
  },
  card: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const SearchPage = ({ loading, datas }) => {
  const classes = useStyles();

  return loading ? (
    <CircularProgress />
  ) : datas.length === 0 ? null : (
    <Container className={classes.root}>
      <Grid container justify="flex-start" alignitems="center" spacing={3}>
        {datas.map(data => (
          <Grid key={data.store_id} item md={4} sm={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={`${require(`../../assets/images/login.jpg`)}`}
              />
              <CardHeader title={data.store_name} subheader="這才叫美食" />
              <CardContent>
                <div className={classes.rating}>
                  <Rating
                    name="read-only"
                    value={data.star}
                    precision={0.1}
                    readOnly
                  />
                  <Typography variant="caption">{data.star}</Typography>
                </div>

                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
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
