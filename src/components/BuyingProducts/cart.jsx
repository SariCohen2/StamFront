import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Paper, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Styled components
const ProductBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
  borderRadius: '10px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 8px 24px rgba(0,0,0,0.3)',
    cursor: 'pointer',
  },
}));

const ProductImage = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '10px',
  marginRight: '16px',
});

const RemoveButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.main,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.error.dark,
  },
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  padding: theme.spacing(1.5, 3),
  boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
}));

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemove = (id) => {
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "לא תוכל לבטל פעולה זו!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!כן, מחק',
      cancelButtonText: 'ביטול'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCartItems = cartItems.filter(item => item.Id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));
        Swal.fire(
          'נמחק!',
          'המוצר נמחק מהסל שלך.',
          'success'
        );
      }
    });
  };

  const handleNavigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.Price * item.quantity), 0);

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom align="right" sx={{ mb: 4 }}>
        סל קניות
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container direction="column" spacing={2}>
        {cartItems.map((item) => (
          <Grid item key={item.Id}>
            <ProductBox onClick={() => handleNavigateToProduct(item.Id)}>
              <ProductImage src={item.Image} alt={item.Name} />
              <Box flex="1">
                <Typography variant="h6" component="div" dir='rtl'>
                  {item.Name}
                </Typography>
                <Typography variant="body1" color="text.secondary" dir='rtl'>
                  ₪{item.Price}
                </Typography>
                <Typography variant="body2" color="text.secondary" dir='rtl'>
                  כמות: {item.quantity}
                </Typography>
              </Box>
              <RemoveButton onClick={(e) => { e.stopPropagation(); handleRemove(item.Id); }}>
                <DeleteIcon />
              </RemoveButton>
            </ProductBox>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} textAlign="right">
        <Typography variant="h5" component="div" gutterBottom dir='rtl'>
          סה"כ לתשלום: ₪{totalPrice.toFixed(2)}
        </Typography>
        <CheckoutButton variant="contained" size="large" dir='rtl'>
          עבור לתשלום
        </CheckoutButton>
      </Box>
    </Container>
  );
};

export default CartComponent;
