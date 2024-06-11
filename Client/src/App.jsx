import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Navbar from "./Components/Home/Navbar";
import SignUpPage from "./Pages/SignUpPage";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/login" element={<Login />}/>
      </Routes>
    </div>
  );
};

export default App;
