import React from 'react';
import ProductForm from './productForm';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/productService';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleSave = async (product) => {
    try {
      await addProduct(product);
      await Swal.fire({
        icon: 'success',
        title: 'מוצר נוסף בהצלחה!',
        text: 'המוצר נוסף לרשימה בהצלחה.',
        confirmButtonText: 'אוקי'
      });
      navigate('/list');
    } catch (error) {
      console.error('Error adding product:', error);
      await Swal.fire({
        icon: 'error',
        title: 'שגיאה בהוספת מוצר',
        text: 'לא ניתן להוסיף את המוצר.',
        confirmButtonText: 'אוקי'
      });
    }
  };

  return <ProductForm onSave={handleSave} />;
};

export default AddProduct;
