import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  makeStyles,
  Container,
  TextareaAutosize,
  Typography,
  Button,
} from '@material-ui/core';

import RatingBar from './RatingBar';
import { shopActions } from '../redux/actions';

const useStyles = makeStyles(theme => ({
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
    resize: 'none',
  },
  uploadImgBtn: {
    width: 150,
  },
  imgs: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(2),
    '& > div': {
      width: 200,
      height: 200,
      margin: theme.spacing(0.5),
      position: 'relative',
      '& > img': {
        width: '100%',
        height: '100%',
      },
      '& > button': {
        fontSize: 24,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none',
        position: 'absolute',
        top: '-7%',
        left: '93%',
      },
    },
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

const LeaveMessageView = ({ createMessage }) => {
  const classes = useStyles();
  const [commentData, setCommentData] = useState({
    star: 0,
    comments: '',
    pic: [],
  });
  const imgsRef = useRef(null);

  function previewImg(file) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const btn = document.createElement('button');
    btn.innerHTML = 'X';
    btn.onclick = () => removeImg(div, img);
    img.alt = file.name;
    img.src = URL.createObjectURL(file);
    div.appendChild(img);
    div.appendChild(btn);
    imgsRef.current.appendChild(div);
  }

  function removeImg(node, img) {
    imgsRef.current.removeChild(node);
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
        if (!/image/.test(newValue.type)) {
          throw new Error('only allow image files');
        } else {
          previewImg(newValue);
          newValue = [...commentData.pic, newValue];
        }
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
    // createMessage(commentData);
  }

  return (
    <Container>
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
        <input
          id="uploadImage"
          type="file"
          name="pic"
          onChange={handleChange}
          accept="image/*"
          hidden
        />
        <Button
          component="label"
          htmlFor="uploadImage"
          variant="contained"
          color="secondary"
          className={classes.uploadImgBtn}
          disabled={commentData.pic.length >= 3}
        >
          上傳圖片
        </Button>
        <div className={classes.imgs} ref={imgsRef}></div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          送出
        </Button>
      </Container>
    </Container>
  );
};

LeaveMessageView.propTypes = {
  createMessage: PropTypes.func.isRequired,
};

const actionCreator = {
  createMessage: shopActions.createMessage,
};

export default connect(null, actionCreator)(LeaveMessageView);
