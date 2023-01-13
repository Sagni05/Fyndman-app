import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import UserDetail from "./components/UserDetail/UserDetail";
import DesContaioner from "./components/DesContainer";

// import Testing from "./components/Testig";

function App() {
  const user = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {user && <Route path="/userdetail/:id" element={<UserDetail />} />}

        <Route path="/desContaioner/:id/:title" element={<DesContaioner />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
