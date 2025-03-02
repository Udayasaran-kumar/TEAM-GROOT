import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Login from "./pages/login";
import Register from "./pages/Register";
import Home from "./pages/Home1";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Collaborate from "./pages/Collaborate";
import Navbar from "./components/Navbar1";
import Footer from "./components/Footer1";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collaborate" element={<PrivateRoute element={<Collaborate />} />} /> <Route path="/login" element={<Login />} />

            {/* Private Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/explore" element={<PrivateRoute element={<Explore />} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
