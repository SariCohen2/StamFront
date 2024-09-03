import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, IconButton, Button, Dialog, DialogContent, DialogTitle, Grid, Tooltip
} from '@mui/material';
import { styled } from '@mui/system';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';
import { fetchProduct } from '../../services/productService';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// עיצוב עמוד פרטי מוצר
const ProductDetailContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  direction: 'rtl',
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  backgroundColor: '#f5f5f5',
  margin: theme.spacing(0, 1),
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
}));

const QuantityDisplay = styled(Typography)(({ theme }) => ({
  minWidth: '30px',
  textAlign: 'center',
}));

const ProductDetailContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'right',
}));

const ReturnButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  color: theme.palette.primary.main,
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const ZoomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
  },
}));

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [openZoom, setOpenZoom] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchTheProduct = async () => {
      const fetchedProduct = await fetchProduct(productId);
      setProduct(fetchedProduct);

      // בדיקת האם המוצר כבר קיים בסל ואם כן, עדכון הכמות בהתאם
      const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
      const existingProduct = selectedProducts.find(item => item.Id === fetchedProduct.Id);
      if (existingProduct) {
        setQuantity(existingProduct.quantity);
      }
    };
    fetchTheProduct();
  }, [productId]);

  const handleZoomOpen = () => setOpenZoom(true);
  const handleZoomClose = () => setOpenZoom(false);

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, Math.min(10, prevQuantity + delta)));
  };

  const handleAddToCart = () => {
    // בדוק אם המשתמש מחובר
    const email = sessionStorage.getItem('email'); 
    const name=sessionStorage.getItem('name');
    if (!email||!name) {
      Swal.fire({
        title: 'שגיאה',
        text: 'כדי להוסיף מוצר לסל יש להתחבר עם גוגל',
        icon: 'error',
        confirmButtonText: 'אישור',
      });
      return;
    }
  
    // המשך להוסיף את המוצר לסל אם המשתמש מחובר
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
    const existingProductIndex = selectedProducts.findIndex(item => item.Id === product.Id);
  
    if (existingProductIndex !== -1) {
      selectedProducts[existingProductIndex].quantity += quantity;
      if (selectedProducts[existingProductIndex].quantity > 10) {
        selectedProducts[existingProductIndex].quantity = 10;
      }
    } else {
      selectedProducts.push({ ...product, quantity });
    }
  
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  
    Swal.fire({
      title: 'הצלחה!',
      text: 'המוצר נוסף בהצלחה לסל',
      icon: 'success',
      confirmButtonText: 'אישור',
    });
  };
  
  const handleReturn = () => {
    navigate('/list'); // חזרה לרשימת המוצרים
  };

  if (!product) {
    return <Typography>טוען...</Typography>;
  }

  return (
    <ProductDetailContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <ReturnButton onClick={handleReturn}>
          <Tooltip title="חזרה לרשימה">
            <ArrowForwardIosIcon sx={{fontSize:'35px',zIndex:"5",position:"absolute",left:"95vw",top:"15vh"}}/>
          </Tooltip>
        </ReturnButton>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductImage
            src={product.Image}
            alt={product.Name}
            onClick={handleZoomOpen}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            {product.Name}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            ₪{product.Price}
          </Typography>
          <ProductDetailContent>
            <Typography variant="body1" color="text.primary" paragraph>
              {product.More}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <QuantityButton onClick={() => handleQuantityChange(-1)}>
                <RemoveIcon />
              </QuantityButton>
              <QuantityDisplay variant="h5">{quantity}</QuantityDisplay>
              <QuantityButton onClick={() => handleQuantityChange(1)}>
                <AddIcon />
              </QuantityButton>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{ transition: 'background-color 0.3s ease' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d32f2f'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
            >
              הוסף לסל
            </Button>
          </ProductDetailContent>
        </Grid>
      </Grid>

      <ZoomDialog open={openZoom} onClose={handleZoomClose}>
        <DialogTitle>תמונה מוגדלת</DialogTitle>
        <DialogContent>
          <img src={product.Image} alt={product.Name} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
        </DialogContent>
      </ZoomDialog>
    </ProductDetailContainer>
  );
};

export default ProductDetail;
