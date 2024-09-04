import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

const GoogleLoginButton = () => {
  const [user, setUser] = useState(null);

  const handleSuccess = (response) => {

    // console.log("res========",response); // הדפס את התשובה בקונסול
    const userProfile = decodeJwt(response.credential); // פענח את ה-token
    // console.log("userProfile",userProfile);
    // console.log(response.credential);
    
    setUser(userProfile);
    sessionStorage.setItem('name', userProfile.name);
    sessionStorage.setItem('email', userProfile.email);
    sessionStorage.setItem('picture', userProfile.picture);

  };

  const handleError = () => {
    console.error('Login failed');
  };

  // פונקציה לפענוח ה-JWT token
  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).replace(/(\r\n|\n|\r)/g, ''));
    return JSON.parse(base64);
  };

  return (
    <GoogleLogin width={"50px"} shape='circle'
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;
