import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';

import useMountEffect from '../../helpers/useMountEffect';

const useStyles = makeStyles(theme => ({
  uploadImgBtn: {
    width: 150,
  },
  previewImg: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0px`,
    '& > div': {
      width: 200,
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: 150,
        height: 150,
      },
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

const UploadImage = ({
  value,
  uniqueId,
  btnName,
  name,
  disabled,
  appendCallback,
  removeCallback,
}) => {
  const classes = useStyles();
  const imgRef = useRef(null);
  const inputRef = useRef(null);

  useMountEffect(() => {
    value && previewImg(value);
  });

  const previewImg = file => {
    const div = document.createElement('div');
    const img = document.createElement('img');
    const btn = document.createElement('button');
    btn.innerHTML = 'X';
    btn.onclick = () => removeImg(div, img, imgRef.current.name);
    img.alt = file.name;
    img.src = URL.createObjectURL(file);
    div.appendChild(img);
    div.appendChild(btn);
    imgRef.current.appendChild(div);
  };

  const removeImg = (node, img, targetName) => {
    imgRef.current.removeChild(node);
    removeCallback(targetName, img);
  };

  const validation = e => {
    const files = e.target.files[0];
    if (!/image/.test(files.type)) {
      throw new Error('only allow image files');
    } else {
      // clear input value, or updloading the same file is not working
      inputRef.current.value = null;
      previewImg(files);
      appendCallback({
        target: {
          name: e.target.name,
          value: files,
        },
      });
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        id={uniqueId}
        type="file"
        name={name}
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
        disabled={disabled}
      >
        {btnName}
      </Button>
      <div className={classes.previewImg} ref={imgRef}></div>
    </>
  );
};

UploadImage.propTypes = {
  value: PropTypes.object,
  uniqueId: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  appendCallback: PropTypes.func.isRequired,
  removeCallback: PropTypes.func.isRequired,
};

export default UploadImage;
