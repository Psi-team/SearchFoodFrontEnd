import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles, Container, Typography } from '@material-ui/core';

import MessageView from './MessageView';
import { useRef } from "react";

const useStyles = makeStyles(theme => ({

}));

const CommentsView = ({ data }) => {
  const classes = useStyles();
  const [commentData, setCommentData] = useState({ star: 0, comments: "", pic: [] });
  const imgsRef = useRef(null);

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
          const div = document.createElement('div');
          const img = document.createElement('img');
          const btn = document.createElement('button');
          btn.innerHTML = 'X';
          btn.onclick = () => removeImg(div, img);
          img.alt = newValue.name;
          img.src = URL.createObjectURL(newValue);
          div.appendChild(img);
          div.appendChild(btn);
          imgsRef.current.appendChild(div);
          newValue = [...commentData.pic, newValue];
        }
        break;
      default:
        throw new Error(`unknown name ${e.target.name}`);
    }

    setCommentData({
      ...commentData,
      [e.target.name]: newValue
    });
  }

  function removeImg(node, img) {
    imgsRef.current.removeChild(node);
    const newValue = commentData.pic.filter(_ => _ !== img);
    setCommentData({
      ...commentData,
      pic: newValue
    });

  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Container>
      <MessageView
        imgsRef={imgsRef}
        state={commentData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

CommentsView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CommentsView;