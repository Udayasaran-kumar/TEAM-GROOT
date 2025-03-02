import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import { AuthProvider } from "./context/AuthProvider";
import CollaborationProvider from './context/CollaborationContext';
import ThemeProvider, { useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Collaborate from "./pages/Collaborate";
import Login from "./pages/login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Create a wrapped app component to use the theme hook
const AppContent = () => {
  const { darkMode } = useTheme();
  
  return (
   
      <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-200`}>
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collaborate" element={<PrivateRoute element={<Collaborate />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/explore" element={<PrivateRoute element={<Explore />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <CollaborationProvider>
            <ThemeProvider>
              <AppContent />
            </ThemeProvider>
          </CollaborationProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
