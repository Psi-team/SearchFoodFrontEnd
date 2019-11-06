import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';


const DialogComponent = (props) => {
  const { open, title, children, onCancel, onSubmit } = props;

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      {children}
      <DialogActions>
        <Button autoFocus color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSubmit}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default DialogComponent;