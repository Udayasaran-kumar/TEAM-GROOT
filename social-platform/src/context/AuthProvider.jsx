// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "./AuthContext";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate(); //  Use navigate for redirection

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser({ token });
//     }
//   }, []);

//   const login = async (username, password) => {
//     const response = await fetch("http://localhost:5000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("username", username);
//       setUser({ token: data.token, username });
//       navigate("/"); // Redirect to Home after login
//       return true
//     } else {
//       alert(data.message);
//       return false;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     setUser(null);
//     navigate("/login"); // Redirect to Login after logout
//     window.location.reload();
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext"; // ✅ Correct import

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  // ✅ Login function with redirect to profile
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        const decodedUser = jwtDecode(data.token);
        setUser(decodedUser);
        navigate("/profile"); // ✅ Redirect to Profile after login
        return true;
      } else {
        alert(data.message);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
