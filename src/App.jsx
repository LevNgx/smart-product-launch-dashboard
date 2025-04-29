import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashBoardPage from './pages/DashBoardPage';
import SubmitIdeaPage from './pages/SubmitIdeaPage';
import ProtectedRoute from './route-guard/ProtectedRoute';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/register';
  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  

  return (

      <div style={styles.appWrapper}>
       {!hideNavbar && <header style={styles.header}>
          <div style={styles.navLeft}>
            <Link to="/dashboard" style={styles.navLink}>LaunchPad</Link>
            {/* <Link to="/submit-idea" style={styles.navLink}>Submit Idea</Link> */}
          </div>
          <div style={styles.navRight}>
            <div style={styles.hamburger} onClick={toggleMenu}>☰</div>
            {menuOpen && (
              <div style={styles.dropdown}>
                <Link to="/" style={styles.dropdownLink}>Logout</Link>
                {/* <Link to="/register" style={styles.dropdownLink}>Register</Link> */}
              </div>
            )}
          </div>
        </header> }

        <main style={styles.pageWrapper}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashBoardPage />
              </ProtectedRoute>
              
              } />
            <Route path="/submit-idea" element={
              <ProtectedRoute>
                 <SubmitIdeaPage />
              </ProtectedRoute>
             
              } />
          </Routes>
        </main>
      </div>
   
  );
}

const styles = {
  appWrapper: {
    fontFamily: "'Poppins', sans-serif",  // <-- Add this line
    backgroundColor: "#bfc3c7",
    minHeight: "100vh",
    width: "100%",   // <--- Important
    display: "flex",
    flexDirection: "column", // stack header and page
  },
  header: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    backgroundColor: "#2C3E50",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px", // reduced
    zIndex: "1000",
    boxSizing: "border-box", // <--- Important
  },
  navLeft: {
    display: "flex",
    gap: "30px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "500",
  },

  hamburger: {
    fontSize: "24px",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "40px",
    right: "0",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  dropdownLink: {
    padding: "10px 20px",
    textDecoration: "none",
    color: "#2C3E50",
    fontWeight: "500",
    fontSize: "16px",
    borderBottom: "1px solid #eee",
  },
  pageWrapper: {
    // marginTop: "80px", // leave space below navbar
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  //  padding: "20px",
  },
};

export default App;
