import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  makeStyles,
  Container,
  TextareaAutosize,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';

import { shopActions } from '../redux/actions';
import RatingBar from './RatingBar';
import UploadImage from './UploadImage';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(5),
  },
  messageBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div, & > textarea': {
      marginBottom: theme.spacing(2),
    },
  },
  rating: {
    display: 'flex',
    '& > h6': {
      width: 80,
    },
  },
  textarea: {
    width: '100%',
    fontSize: 18,
    resize: 'none',
  },
  button: {
    [theme.breakpoints.up('md')]: {
      width: 200,
      alignSelf: 'flex-end',
    },
    '& > span': {
      color: '#000',
      fontWeight: 550,
      fontSize: '1.6rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
      },
    },
  },
}));

const LeaveMessageView = ({ createMessage, storeId, username, loading }) => {
  const classes = useStyles();
  const [commentData, setCommentData] = useState({
    star: 0,
    comments: '',
    pic: [],
  });

  function removeImg(img) {
    const newValue = commentData.pic.filter(_ => _ !== img);
    setCommentData({
      ...commentData,
      pic: newValue,
    });
  }

  function handleChange(e) {
    let newValue;
    switch (e.target.name) {
      case 'star':
        newValue = Number(e.target.value);
        break;
      case 'comments':
        newValue = e.target.value;
        break;
      case 'pic':
        newValue = e.target.files[0];
        newValue = [...commentData.pic, newValue];
        break;
      default:
        throw new Error(`unknown name ${e.target.name}`);
    }

    setCommentData({
      ...commentData,
      [e.target.name]: newValue,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    createMessage({ ...commentData, storeId, username });
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" paragraph>
        您的評論
      </Typography>
      <Container
        className={classes.messageBody}
        component="form"
        onSubmit={handleSubmit}
      >
        <div className={classes.rating}>
          <Typography variant="subtitle1">評分</Typography>
          <RatingBar
            rating={commentData.star}
            readOnly={false}
            handleChange={handleChange}
          />
        </div>
        <TextareaAutosize
          rows={10}
          rowsMax={10}
          className={classes.textarea}
          placeholder="請寫下您的評論"
          value={commentData.comments}
          onChange={handleChange}
          name="comments"
        />
        <UploadImage
          appendCallback={handleChange}
          uniqueId="commentUpload"
          btnName="上傳圖片"
          removeCallback={removeImg}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            送出
          </Button>
        )}
      </Container>
    </Container>
  );
};

LeaveMessageView.propTypes = {
  loading: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
  createMessage: PropTypes.func.isRequired,
};

function mapStateToProp(state) {
  return {
    username: state.user.username,
    loading: state.createMessage.loading,
  };
}

const actionCreator = {
  createMessage: shopActions.createMessage,
};

export default connect(mapStateToProp, actionCreator)(LeaveMessageView);
