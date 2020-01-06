import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  makeStyles,
  Paper,
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  GridList,
} from '@material-ui/core';

import {
  AssignmentInd as AssignmentIndIcon,
  MailOutline as MailOutlineIcon,
  Cake as CakeIcon,
  Wc as WcIcon,
} from '@material-ui/icons';

import useMountEffect from '../helpers/useMountEffect';
import { userActions } from '../redux/actions';
import Loading from '../components/Common/Loading';
import StoreCardView from '../components/Stores/StoreCardView';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: `${theme.spacing(2)}px`,
  },
  container: {
    margin: `${theme.spacing(5)}px 0px`,
    '& img': {
      width: '100%',
      justifySelf: 'center',
    },
  },
}));

const Profile = props => {
  const classes = useStyles();
  useMountEffect(() => props.getProfile());

  return (
    <Paper className={classes.root}>
      <Loading loading={props.loading} />
      <Typography variant="h4" component="h1">
        基本資料
      </Typography>
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={6} container>
          <img src="https://picsum.photos/id/232/288/162" alt="user icon" />
        </Grid>
        <Grid item md={6}>
          <List>
            <ListItem>
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary={props.username} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MailOutlineIcon />
              </ListItemIcon>
              <ListItemText primary={props.mail} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CakeIcon />
              </ListItemIcon>
              <ListItemText primary={props.birthyear} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <WcIcon />
              </ListItemIcon>
              <ListItemText primary={props.sexual === '1' ? '男生' : '女生'} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Divider />
      <Typography variant="h4" component="h1">
        收藏店家
      </Typography>
      <Container className={classes.container}>
        {!props.favorites || props.favorites.length === 0 ? (
          <Typography variant="body2">尚未有收藏店家</Typography>
        ) : (
          <GridList row={3}>
            {props.favorites.map(shop => (
              <StoreCardView data={shop} key={shop.storeId} />
            ))}
          </GridList>
        )}
      </Container>
    </Paper>
  );
};

Profile.propTypes = {
  loading: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  mail: PropTypes.string.isRequired,
  birthyear: PropTypes.string.isRequired,
  sexual: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.string]),
  favorites: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.object])
  ).isRequired,
  getProfile: PropTypes.func.isRequired,
};

function mapStateToProp(state) {
  return {
    loading: state.user.loading,
    username: state.user.username,
    mail: state.user.mail,
    birthyear: state.user.birthyear,
    sexual: state.user.sexual,
    error: state.user.error,
    favorites: state.user.favorites,
  };
}

const actionCreator = {
  getProfile: userActions.getProfile,
};

export default connect(mapStateToProp, actionCreator)(Profile);
