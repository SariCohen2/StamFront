import React, { useEffect, useState } from 'react';
import ProductForm from './productForm';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProduct, updateProduct } from '../../services/productService';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };

    loadProduct();
  }, [id]);

  const handleSave = async (updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct);
      await Swal.fire({
        icon: 'success',
        title: 'מוצר עודכן בהצלחה!',
        text: 'המוצר עודכן לרשימה בהצלחה.',
        confirmButtonText: 'אוקי'
      });
      navigate('/list');
    } catch (error) {
      console.error('Error updating product:', error);
      await Swal.fire({
        icon: 'error',
        title: 'שגיאה בעדכון מוצר',
        text: 'לא ניתן לעדכן את המוצר.',
        confirmButtonText: 'אוקי'
      });
    }
  };

  return product ? <ProductForm initialProduct={product} onSave={handleSave} /> : <p>Loading...</p>;
};

export default EditProduct;
