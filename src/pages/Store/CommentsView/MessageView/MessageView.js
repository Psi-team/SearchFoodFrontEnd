import React from "react";
import PropTypes from 'prop-types';
import {makeStyles, Container, TextareaAutosize, Typography, Button} from '@material-ui/core';

import RatingBar from '../../../../components/RatingBar';

const useStyles = makeStyles(theme => ({

}));

const MessageView = ({ state, handleChange, handleSubmit }) => {
const classes = useStyles();

return (
  <Container component='form' onSubmit={handleSubmit}>
    <RatingBar rating={state.star} readOnly={false} handleChange={handleChange} />
    <input type='file' name='pic' onChange={handleChange} />
    <TextareaAutosize 
      placeholder="請寫下您的評論" 
      value={state.comments} 
      onChange={handleChange}
      name='comments' />
    <Button type='submit'>送出</Button>
  </Container>
);
};

MessageView.propTypes = {

};

export default MessageView;