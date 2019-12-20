import React from "react";
import PropTypes from 'prop-types';
import { makeStyles, Container, TextareaAutosize, Typography, Button } from '@material-ui/core';

import RatingBar from '../../../../components/RatingBar';

const useStyles = makeStyles(theme => ({
  messageBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div, & > textarea': {
      marginBottom: theme.spacing(2),
    }
  },
  rating: {
    display: 'flex',
    '& > h6': {
      width: 80
    }
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
        left: '93%'
      }
    }
  },
  button: {
    [theme.breakpoints.up('md')]: {
      width: 200,
      alignSelf: 'flex-end'
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

const MessageView = ({ state, imgsRef, handleChange, handleSubmit }) => {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant='h4' paragraph>您的評論</Typography>
      <Container className={classes.messageBody} component='form' onSubmit={handleSubmit}>
        <div className={classes.rating}>
          <Typography variant='subtitle1'>評分</Typography>
          <RatingBar rating={state.star} readOnly={false} handleChange={handleChange} />
        </div>
        <TextareaAutosize
          rows={10}
          rowsMax={10}
          className={classes.textarea}
          placeholder="請寫下您的評論"
          value={state.comments}
          onChange={handleChange}
          name='comments'
        />
        <input
          id='uploadImage'
          type='file'
          name='pic'
          onChange={handleChange}
          accept="image/*"
          hidden
        />
        <Button
          component='label'
          htmlFor='uploadImage'
          variant="contained"
          color='secondary'
          className={classes.uploadImgBtn}
          disabled={state.pic.length >= 3}
        >
          上傳圖片
        </Button>
        <div className={classes.imgs} ref={imgsRef}>
        </div>
        <Button
          type='submit'
          variant="contained"
          color='primary'
          className={classes.button}
        >
          送出
        </Button>
      </Container>
    </Container>
  );
};

MessageView.propTypes = {
  state: PropTypes.object.isRequired,
  imgsRef: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default MessageView;