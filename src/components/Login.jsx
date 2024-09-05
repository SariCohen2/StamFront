import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { addUser } from '../services/userService';
const GoogleLoginButton = ({ onClose }) => {
  const [user, setUser] = useState(null);

  const handleSuccess = async (response) => {
    const userProfile = decodeJwt(response.credential); // פענוח ה-token
    setUser(userProfile);

    // שמירת הנתונים ב-sessionStorage
    sessionStorage.setItem('name', userProfile.name);
    sessionStorage.setItem('email', userProfile.email);
    sessionStorage.setItem('picture', userProfile.picture);

    // קריאה לפונקציה להוספת משתמש לשרת
    await addUser(userProfile.name, userProfile.email, userProfile.picture);

    // סגירת הדיאלוג לאחר הצלחה
    onClose();
  };

  const handleError = () => {
    console.error('Login failed');
  };

  const decodeJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).replace(/(\r\n|\n|\r)/g, ''));
    return JSON.parse(base64);
  };

  // הוספת המשתמש לשרת
  // const addUser = async (name, email, image) => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ Name: name, Email: email, Image: image }),
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error('Error adding user:', error);
  //     throw error;
  //   }
  // };

  return (
    <GoogleLogin 
      width="50px" 
      shape="circle"
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;
