import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("token");
        
        console.log("yes token");
        if (!token) {
          console.log("no token");
          
          setIsAuthenticated(false);
          setIsLoading(false);
          if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
          }
          return;
        }

        // const response = await axios.get("http://localhost:3002/authcheck", {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // });

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;