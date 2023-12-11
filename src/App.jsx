import { Route, Switch, Routes, BrowserRouter } from "react-router-dom"
import Home from "./components/Home";
import Change from "./components/Change";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route to="/" element={<Home />} />
          <Route to="/change" element={<Change />} />
          <Route to="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
