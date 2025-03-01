import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import CollaborationProvider from './context/CollaborationContext';
import ErrorBoundary from './components/ErrorBoundary';
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Collaborate from "./pages/Collaborate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <CollaborationProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
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
        </CollaborationProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
