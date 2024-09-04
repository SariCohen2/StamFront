// src/services/productService.js
// const API_URL = 'http://10.217.59.99:5000/api/products';
const API_URL = 'https://KobiStam.onrender.com/api/products';
//local
// const API_URL='http://127.0.0.1:5000/api/products';

export async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("data========",data);
    
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
}
export async function fetchProduct(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("data========",data);
      
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    }
  }

  export const addProduct = async (product) => {
    console.log(JSON.stringify(product));
    product.Id="0";
    // product.Image="xx";
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // וודא שאתה שולח את הכותרת הנכונה
        },
        body: JSON.stringify(product), // המרה של האובייקט לפורמט JSON
      });
      console.log(response);
      
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error details:', errorDetails);
        throw new Error('Failed to add product');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };
  
  export const updateProduct = async (id, updatedProduct) => {
    // console.log("product.Id=",product);
     const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
  
    const data = await response.json();
    return data;
  };
  
  export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return true;
  };
