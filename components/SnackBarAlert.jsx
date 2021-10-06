import React, { useEffect, useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import { SnackBarTimeout } from "utils/config";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBarAlert(props) {
  const [state, setState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: props.message || ``,
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    function handleMessage(message) {
      setState({
        ...state,
        message: message,
        open: true,
      });
    }
    if (props.message.length > 0) {
      handleMessage(props.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.message]);

  function handleClose(event) {
    if (event !== null) {
      setState({ ...state, open: false });
    }
  }

  function handleTimeOutClose(event) {
    if (event === null) {
      setState({ ...state, open: false });
    }
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={SnackBarTimeout}
      open={open}
      key={vertical + horizontal}
      onClose={handleTimeOutClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%", display: `flex`, alignContent: `center` }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
}
