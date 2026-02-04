import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/login";
import Signup from "./components/Signup";
import MyResultPage from "./pages/MyResultPage";

//private protected route
function RequiereAuth({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/result"
          element={
            <RequiereAuth>
              <MyResultPage />
            </RequiereAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
