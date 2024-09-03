import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../services/productService';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: theme.spacing(2),
  borderRadius: '10px',
  transition: 'transform 0.3s ease',
  cursor: 'pointer', // Add cursor pointer to indicate it's clickable
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,
  backgroundSize: 'contain',
}));

const ProductItem = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const isAdmin = () => sessionStorage.getItem('role') === 'true';

  const handleEditClick = (event) => {
    event.stopPropagation(); // Stop propagation to prevent triggering the card click
    navigate(`/edit-product/${product.Id}`);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Stop propagation to prevent triggering the card click
    const handleDelete = async () => {
      try {
        const result = await Swal.fire({
          title: 'האם אתה בטוח?',
          text: 'לא ניתן לשחזר את המוצר לאחר מחיקה!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '!כן, מחק',
          cancelButtonText: 'לא, בטל',
        });

        if (result.isConfirmed) {
          await deleteProduct(product.Id);
          onDelete(product.Id);
          Swal.fire('נמחק!', 'המוצר נמחק בהצלחה.', 'success');
        }
      } catch (error) {
        console.error('Failed to delete product:', error);
        Swal.fire('שגיאה!', 'הייתה שגיאה במחיקת המוצר.', 'error');
      }
    };
    handleDelete();
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
      <CardContent>
        <Typography variant="h5" component="div">
          {product.Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.Description}
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" color="primary">
            מחיר: ₪{product.Price}
          </Typography>
          {isAdmin() && <Typography variant="body2" color="text.secondary">
            תאריך: {product.Date}
          </Typography>}
        </Box>
        {isAdmin() && (
          <Box mt={2} display="flex" justifyContent="space-between">
            <IconButton color="primary" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default ProductItem;
