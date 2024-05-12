import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// eslint-disable-next-line react-refresh/only-export-components
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const useToast = () => {
  const [open, setOpen] = useState(false);

  const showToast = () => {
    setOpen(true);
  };

  const hideToast = () => {
    setOpen(false);
  };

  const Toast = ({
    message,
    severity,
  }: {
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }) => (
    <Snackbar open={open} autoHideDuration={6000} onClose={hideToast}>
      <Alert onClose={hideToast} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { showToast, hideToast, Toast };
};
