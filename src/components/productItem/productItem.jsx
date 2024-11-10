import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../services/productService';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  boxShadow: theme.shadows[4], // שיפור הצללה
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8], // צל חזק יותר בה-hover
  },
  position: 'relative', // לאפשר תוויות מוצרים
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundSize: 'cover', // התמונה תתפרס על כל הכרטיס
  backgroundPosition: 'center', // התמונה ממורכזת
}));

const ProductItem = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const isAdmin = () => sessionStorage.getItem('role') === 'true';

  const handleEditClick = (event) => {
    event.stopPropagation();
    navigate(`/edit-product/${product.Id}`);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(product.Id);
          onDelete(product.Id);
          Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'There was a problem deleting the product.', 'error');
        }
      }
    });
  };

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`);
  };

  return (
    <StyledCard dir='rtl' onClick={handleCardClick}>
      <StyledCardMedia
        component="img"
        image={product.Image}
        alt={product.Name}
      />
      {/* תווית "במבצע" */}
      {product.OnSale && (
        <Box sx={{
          position: 'absolute', top: 10, left: 10,
          backgroundColor: 'red', color: 'white',
          padding: '5px 10px', borderRadius: '5px',
        }}>
          במבצע
        </Box>
      )}
      <CardContent sx={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '1.25rem' }}>
          {product.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '20px' }}>
          {product.Description}
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
            ₪{product.Price}
          </Typography>
          {isAdmin() && (
            <Typography variant="body2" color="text.secondary">
              תאריך: {product.Date}
            </Typography>
          )}
        </Box>
        {isAdmin() && (
          <Box mt={2} display="flex" justifyContent="space-between">
            <IconButton 
              color="primary" 
              onClick={handleEditClick}
              sx={{
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.2)', // הגדלת הכפתור בה-hover
                  color: '#1976d2',
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              color="error" 
              onClick={handleDeleteClick}
              sx={{
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.2)', // הגדלת הכפתור בה-hover
                  color: '#d32f2f',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ProductItem;
