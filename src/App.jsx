import { Route, Routes, BrowserRouter } from "react-router-dom"
import Home from "./components/Home";
import Change from "./components/Change";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/change" element={<Change />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
