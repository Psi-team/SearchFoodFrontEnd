import React, { useRef } from 'react';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  uploadImgBtn: {
    width: 150,
  },
  previewImg: {
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
}));

const UploadImage = ({ uniqueId, btnName, appendCallback, removeCallback }) => {
  const classes = useStyles();
  const imgRef = useRef(null);

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
    imgRef.current.appendChild(div);
  }

  function removeImg(node, img) {
    imgRef.current.removeChild(node);
    removeCallback(img);
  }

  function validation(e) {
    const files = e.target.files[0];
    if (!/image/.test(files.type)) {
      throw new Error('only allow image files');
    } else {
      previewImg(files);
      appendCallback(e);
    }
  }

  return (
    <>
      <input
        id={uniqueId}
        type="file"
        name="pic"
        onChange={validation}
        accept="image/*"
        hidden
      />
      <Button
        component="label"
        htmlFor={uniqueId}
        variant="contained"
        color="secondary"
        className={classes.uploadImgBtn}
      >
        {btnName}
      </Button>
      <div className={classes.previewImg} ref={imgRef}></div>
    </>
  );
};

export default UploadImage;
