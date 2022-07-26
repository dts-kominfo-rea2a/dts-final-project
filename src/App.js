import './App.css';
import SnackbarComponent from "./components/SnackbarComponent";
import Button from "@mui/material/Button";
import { snackbarSuccess } from "./redux/actions/showSnackbar";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <SnackbarComponent />
      <header className="App-header">
        <Button
          color="success"
          onClick={() => dispatch(snackbarSuccess("Berhasill !!!"))}
        >
          Show
        </Button>
      </header>
    </div>
  );
}

export default App;
