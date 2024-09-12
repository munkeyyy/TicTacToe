import { Route, Routes } from "react-router-dom";
import "./App.css";
import Spinner from "./Components/Spinner/Spinner";
import Tictactoe from "./Components/Tictactoe/Tictactoe";

function App() {
  return (
    <div>
      {/* <Tictactoe/> */}
      <Routes>
        <Route path="/" element={<Spinner />} />
        <Route path="/game" element={<Tictactoe />} />
        <Route
          path="*"
          element={
            <div
              style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{color:"black"}}>404 not found !</h1>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
