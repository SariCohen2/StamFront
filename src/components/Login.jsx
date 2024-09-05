import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { addUser } from '../services/userService';
const GoogleLoginButton = () => {
  const [user, setUser] = useState(null);

  const handleSuccess = async (response) => {

    console.log("res========",response); // הדפס את התשובה בקונסול
    const userProfile = decodeJwt(response.credential); // פענח את ה-token
    
    setUser(userProfile);
    sessionStorage.setItem('name', userProfile.name);
    sessionStorage.setItem('email', userProfile.email);
    sessionStorage.setItem('picture', userProfile.picture);
    await addUserToDB(userProfile);
  };
  async function addUserToDB(userProfile) {
    try {
      await addUser(userProfile.name, userProfile.email, userProfile.picture);
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  }

  const handleError = () => {
    console.error('Login failed');
  };

  // פונקציה לפענוח ה-JWT token
  // const decodeJwt = (token) => {
  //   const base64Url = token.split('.')[1];
  //   const base64 = decodeURIComponent(atob(base64Url).replace(/(\r\n|\n|\r)/g, ''));
  //   return JSON.parse(base64);
  // };
  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  };
  
  return (
    <GoogleLogin width={"50px"} shape='circle'
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;
