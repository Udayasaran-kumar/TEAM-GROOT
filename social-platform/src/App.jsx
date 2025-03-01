import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import CollaborationProvider from './context/CollaborationContext';
import ThemeProvider from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Collaborate from "./pages/Collaborate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Create a wrapped app component to use the theme hook
const AppContent = () => {
  const { darkMode } = useTheme();
  
  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-200`}>
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/collaborate" element={<Collaborate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <CollaborationProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </CollaborationProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
