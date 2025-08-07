// App.jsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";

// Public Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Skills from "./pages/Skills";
import Journals from "./pages/Journals";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Feedback from "./pages/Feedback";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if it's a detail view (contains slug parameter)
    const isDetailView = pathname.split('/').length > 2 && 
                         ['blogs', 'services', 'journals'].some(section => 
                           pathname.startsWith(`/${section}/`)
                         );
    
    if (isDetailView) {
      // For detail views, scroll to the content section after a brief delay
      setTimeout(() => {
        const contentSection = document.getElementById('services-grid') || 
                              document.getElementById('blogs-grid') || 
                              document.getElementById('journals-grid') ||
                              document.querySelector('main');
        if (contentSection) {
          contentSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    } else {
      // For main section pages, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]);

  return null;
}

// Layout Component for Public Pages
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path="/services/:slug"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path="/skills"
          element={
            <Layout>
              <Skills />
            </Layout>
          }
        />
        <Route
          path="/blogs"
          element={
            <Layout>
              <Blogs />
            </Layout>
          }
        />
        <Route
          path="/blogs/:slug"
          element={
            <Layout>
              <Blogs />
            </Layout>
          }
        />
        <Route
          path="/journals"
          element={
            <Layout>
              <Journals />
            </Layout>
          }
        />
        <Route
          path="/journals/:slug"
          element={
            <Layout>
              <Journals />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/feedback"
          element={
            <Layout>
              <Feedback />
            </Layout>
          }
        />
      </Routes>
    </Router>
  </ThemeProvider>
  );
}

export default App;
