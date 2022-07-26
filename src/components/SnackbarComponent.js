import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { clearSnackbar } from "../redux/actions/showSnackbar";

export default function SnackbarComponent() {
  const dispatch = useDispatch();


  const { snackbarOpen, snackbarMessage, color } = useSelector(
    (state) => state.snackbarNotifications
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={color} sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
