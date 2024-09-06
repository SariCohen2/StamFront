// src/services/productService.js
// const API_URL = 'http://10.217.59.99:5000/api/products';
const API_URL = 'https://kobistam.onrender.com/api/products';
//local
// const API_URL='http://127.0.0.1:5000/api/products';
let products;

export async function fetchProducts() {
  if (!products) {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      products = data;
      // console.log("data========",data);
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      throw error;
    }

  }
  else
    return products;
}
export async function fetchProduct(id) {
  // בדוק אם המערך המקומי קיים ואם המוצר המבוקש נמצא בו
  if (products) {
    const product = products.find((product) => product.Id === id);
    if (product) {
      console.log('product found in local');
      return product; // החזר את המוצר אם הוא קיים במערך המקומי
    }
  }

  // אם המוצר לא נמצא במערך המקומי או אם המערך לא קיים, בצע קריאה לשרת
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // אם הצלחנו להביא את המוצר מהשרת, נוסיף אותו למערך המקומי
    // if (products) {
    //   products.push(data);
    // } else {
    //   products = [data];
    // }

    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
}
export const addProduct = async (product) => {
  console.log(JSON.stringify(product));
  product.Id = "0";
  // product.Image="xx";
  try {
    const response = await fetch(API_URL, {
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
    console.log('added successfully');
    product = [...products, response.body]
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
  console.log('updated successfully');

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
  console.log('deleted successfully');

  return true;
};
