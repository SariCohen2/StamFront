// services/userService.js
// const API_URL = 'http://10.217.59.99:5000';
const API_URL = 'https://kobistam.onrender.com';
// const API_URL='http://127.0.0.1:5000';

// Fetch all users
export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/api/users`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Add a new user
export async function addUser(name, email, image) {
  console.log('in add user name,email,image=',name,email,image);
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name: name, Email: email, Image: image }),
    });
    if (!response.ok) {
      console.log('error response=',response);
      
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

// Update an existing user
export async function updateUser(name, email, image) {
  try {
    const response = await fetch(`${API_URL}/api/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name: name, Email: email, Image: image }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Check admin credentials
export async function adminCheck(name, password) {
  console.log('in check admi n username, passord=',name,password);
  
  try {
    const response = await fetch(`${API_URL}/api/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name: name, Password: password }),
    });
    console.log(response);  // הוסף את זה כדי לראות את התגובה
    console.log('response token=', response.token);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking admin credentials:', error);
    throw error;
  }
}
