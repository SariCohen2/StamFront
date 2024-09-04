import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, IconButton, Button, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear'; // אייקון X
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Styled components
const ProductBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(5),
  margin: theme.spacing(1, 0),
  // marginLeft:'20vw',
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  width: 'calc(100% - 32px)', // הגבלת הרוחב של המוצר
  maxWidth: '800px', // הגבלת רוחב מקסימלי
  height: '150px', // גובה מוגדל
  borderBottom: `1px solid #d0d0d0`, // פס דק אפור בהיר
  direction: 'rtl',
}));

const RemoveButton = styled(IconButton)(({ theme }) => ({
  color: '#3e2723',
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  transition: 'color 0.3s ease',
  zIndex: 1, // לוודא שהאיקס נמצא מעל התמונה
  '&:hover': {
    color: '#b71c1c',
  },
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '80px', // הקטנת התמונה
  height: '80px', // הקטנת התמונה
  objectFit: 'cover',
  borderRadius: '4px',
  marginLeft: theme.spacing(2),
}));

const ProductInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  marginLeft: theme.spacing(2),
  cursor: 'pointer', // הוספת סמן לחיצה על פרטי המוצר
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#3e2723',
  fontSize: '1rem', // גודל פונט מוגדל
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem', // גודל פונט מוגדל
}));

const QuantityControl = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2), // צמצום המרווח
}));

const ControlButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '8px', // כפתורים מוגדלים
  transition: 'background-color 0.3s ease, color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
  },
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#3e2723',
  marginRight: '50px', // הוספת רווח בין הכפתורים למחיר
  fontSize: '1rem', // גודל פונט מוגדל
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  backgroundColor: '#3e2723',
  color: '#ffffff',
  padding: theme.spacing(1.5, 3), // הצמצום של הרווחים
  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: '#3e2723',
    transform: 'scale(1.05)',
  },
}));

const TotalPriceText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: '#3e2723',
  fontSize: '1.5rem', // גודל פונט גדול יותר
  marginBottom: theme.spacing(2),
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

  const handleQuantityChange = (id, change) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.Id === id) {
        return {
          ...item,
          quantity: Math.max(item.quantity + change, 1) // Ensure quantity is at least 1
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));
  };

  const handleNavigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.Price * item.quantity), 0);

  return (
    <Container sx={{ textAlign: 'right' }}>
      <Typography variant="h3" component="h1" gutterBottom align="right" sx={{ mb: 4, fontWeight: 'bold', color: '#3e2723' }}>
        סל קניות
      </Typography>
      <Grid container direction="column" alignItems={'end'} spacing={1} sx={{ textAlign: 'right' }}>
        {cartItems.map((item) => (
          <Grid item key={item.Id}>
            <ProductBox>
              <RemoveButton onClick={(e) => { e.stopPropagation(); handleRemove(item.Id); }}>
                <Tooltip title="הסרה מהסל">
                  <ClearIcon />
                </Tooltip>
              </RemoveButton>
              <ProductImage src={item.Image} alt={item.Name} />
              <Box flex={1} onClick={() => handleNavigateToProduct(item.Id)} style={{ cursor: 'pointer' }}>
                <ProductInfo>
                  <ProductName variant="h6" component="div">
                    {item.Name}
                  </ProductName>
                  <ProductDescription variant="body2">
                    {item.Description}
                  </ProductDescription>
                </ProductInfo>
              </Box>
              <Box display="flex" alignItems="center" ml={2}>
                <QuantityControl>
                  <ControlButton onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.Id, -1); }}>
                    <RemoveIcon />
                  </ControlButton>
                  <Typography variant="body1" component="div" sx={{ mx: 1, fontWeight: 'bold' }}>
                    {item.quantity}
                  </Typography>
                  <ControlButton onClick={(e) => { e.stopPropagation(); handleQuantityChange(item.Id, 1); }}>
                    <AddIcon />
                  </ControlButton>
                </QuantityControl>
                <PriceText variant="body1">
                  ₪{(item.Price * item.quantity).toFixed(2)}
                </PriceText>
              </Box>
            </ProductBox>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} textAlign="right">
        <TotalPriceText variant="h4" component="div" gutterBottom>
          סה"כ לתשלום: ₪{totalPrice.toFixed(2).toLocaleString()}
        </TotalPriceText>
        <CheckoutButton variant="contained" size="large">
          עבור לתשלום
        </CheckoutButton>
      </Box>
    </Container>
  );
};

export default CartComponent;
