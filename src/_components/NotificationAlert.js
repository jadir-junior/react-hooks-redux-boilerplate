import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';

import { alertActions } from '../_actions';

export default function NotificationAlert(props) {
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    return () => {
      dispatch(alertActions.clear());
    };
  });

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={props.severity}
        elevation={6}
        variant="filled"
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
