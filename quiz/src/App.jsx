import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
