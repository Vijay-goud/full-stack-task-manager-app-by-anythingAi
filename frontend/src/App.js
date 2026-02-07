import { useState } from "react";
import Register from "./components/Register/Register";
import Login from "./components/login/login";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowRegister(false); 
  };

  if (token) {
    return <Dashboard token={token} onLogout={handleLogout} />;
  }

  return (
    <div className="app-container">
      {showRegister ? (
        <Register
          onRegisterSuccess={() => setShowRegister(false)}
          onShowLogin={() => setShowRegister(false)}
        />
      ) : (
        <Login
          setToken={setToken}
          onUserNotFound={() => setShowRegister(true)}
          onShowRegister={() => setShowRegister(true)}
        />
      )}
    </div>
  );
}

export default App;
