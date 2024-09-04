import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to home if the path is not found
    navigate('/home', { replace: true });
  }, [navigate]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>If you are not redirected automatically, <a href="/home">click here</a>.</p>
    </div>
  );
};

export default NotFound;
