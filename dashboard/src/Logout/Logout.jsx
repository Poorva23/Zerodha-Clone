import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
    console.log("logout");
    
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.clear();
 
    navigate('/login');
  }, [navigate]);

  return (
    <div className="">
        Logging out... 
    </div>
  );
};

export default Logout;