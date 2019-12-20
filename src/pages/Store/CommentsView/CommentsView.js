import React, { useState } from "react";
import PropTypes from 'prop-types';
import {makeStyles, Container, Typography} from '@material-ui/core';

import MessageView from './MessageView';

const useStyles = makeStyles(theme => ({

}));

const CommentsView = ({ data }) => {
  const classes = useStyles();
  const [ commentData, setCommentData ] = useState({star: 0, comments: "", pic: []});
  console.log(commentData);
  function handleChange(e) {
    let newValue;
    switch(e.target.name) {
      case 'star':
        newValue = Number(e.target.value);
        break;
      case 'comments':
        newValue = e.target.value;
        break;
      case 'pic':
        newValue = e.target.files;
      default:
        throw new Error(`unknown name ${e.target.name}`);
    }

    setCommentData({
      ...commentData,
      [e.target.name]: newValue
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Container>
      <Typography variant='h4'>店家評論</Typography>
      <MessageView  state={commentData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </Container>
  );
};

CommentsView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentsView;