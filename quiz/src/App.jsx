import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/login";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
