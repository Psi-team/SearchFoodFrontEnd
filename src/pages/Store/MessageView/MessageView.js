import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Container,
  TextareaAutosize,
  Typography,
  Button,
} from '@material-ui/core';

import RatingBar from '../../../components/RatingBar';

const useStyles = makeStyles(theme => ({}));

const MessageView = ({ state, imgsRef, handleChange, handleSubmit }) => {
  const classes = useStyles();

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
            rating={state.star}
            readOnly={false}
            handleChange={handleChange}
          />
        </div>
        <TextareaAutosize
          rows={10}
          rowsMax={10}
          className={classes.textarea}
          placeholder="請寫下您的評論"
          value={state.comments}
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
          disabled={state.pic.length >= 3}
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

MessageView.propTypes = {
  state: PropTypes.object.isRequired,
  imgsRef: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default MessageView;
