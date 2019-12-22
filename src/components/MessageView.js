import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Container,
  Typography,
  List,
  ListItem,
  Paper,
} from '@material-ui/core';

import RatingBar from './RatingBar';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    '& > p': {
      margin: theme.spacing(1),
    },
    '& > div': {
      marginLeft: theme.spacing(1),
    },
  },
  imgs: {
    display: 'flex',
    '& > img': {
      width: 100,
      height: 100,
      margin: theme.spacing(1),
    },
  },
}));

const MessageView = ({ data }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Typography variant="h4" paragraph>
        看看其他評論
      </Typography>
      <Paper>
        <List>
          {data.map((item, idx) => (
            <ListItem
              key={idx}
              alignItems="flex-start"
              className={classes.item}
              divider={true}
            >
              <Typography variant="body2">
                {`${item.createUser.substring(0, 1)}${'*'.repeat(8)}`}
              </Typography>
              <RatingBar rating={item.star} readOnly={true} />
              <Typography variant="body2">{item.contents}</Typography>
              <div className={classes.imgs}>
                {item.pictures.map(pic => (
                  <img key={pic.toString()} src={pic} alt="shop" />
                ))}
              </div>
              <Typography variant="body2" color="textSecondary">
                {item.createDate}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

MessageView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MessageView;
