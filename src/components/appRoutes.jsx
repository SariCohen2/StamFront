import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Divider, Box, Tooltip, Avatar, Dialog, DialogTitle, DialogContent, IconButton as DialogIconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GoogleIcon from '@mui/icons-material/Google';
import Home from './home';
import ProductList from './productList/productList';
import AddProduct from './ProductHandling/addProduct';
import EditProduct from './ProductHandling/editProduct';
import Footer from './footer';
import AdminLogin from './adminLogin';
import About from './about';
import CartComponent from './BuyingProducts/cart';
import ProductDetail from './BuyingProducts/productDetails';
import GoogleLoginButton from './Login';
import PrivateRoute from './privateRoute';
import UserList from './userList';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import NotFound from './notFound';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#3e2723',
    color: '#ffffff',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    fontFamily: 'David Libre',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.8rem',
        textAlign: 'left',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#5d4037',
    color: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
    '&:hover': {
        backgroundColor: '#4e342e',
    },
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0.5),
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
        padding: theme.spacing(0.5, 1),
    },
}));

const AppRoutes = () => {
    const [showLoginDialog, setShowLoginDialog] = React.useState(false);
    const name = sessionStorage.getItem('name');
    const picture = sessionStorage.getItem('picture');
    const isAdmin = sessionStorage.getItem('role') === 'true';

    const handleToggleDialog = () => {
        setShowLoginDialog(prev => !prev);
    };

    return (
        <HashRouter>
            <StyledAppBar position="static">
                <StyledToolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
                            <HomeIcon sx={{ fontSize: 35 }} />
                        </IconButton>
                        <LogoTypography variant="h5" component="div">
                            סופר סת"ם
                        </LogoTypography>
                    </Box>
                    <Tooltip title={name ? `שלום, ${name}` : "היכנס באמצעות גוגל"}>
                        <IconButton
                            color="inherit"
                            onClick={handleToggleDialog}
                        >
                            {picture ? (
                                <Avatar src={picture} />
                            ) : (
                                <GoogleIcon sx={{ fontSize: 35, color: '#4285F4' }} />
                            )}
                        </IconButton>
                    </Tooltip>
                </StyledToolbar>
                <Divider sx={{ backgroundColor: '#795548' }} />
                <Toolbar>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
                        <StyledButton
                            variant="contained"
                            startIcon={<ListAltIcon />}
                            component={Link} to="/list"
                        >
                            רשימת מוצרים
                        </StyledButton>
                        <StyledButton
                            variant="contained"
                            startIcon={<InfoOutlinedIcon />}
                            component={Link} to="/about"
                        >
                            אודות
                        </StyledButton>
                        <StyledButton
                            variant="contained"
                            startIcon={<ShoppingCartOutlinedIcon />}
                            component={Link} to="/cart"
                        >
                            סל קניות
                        </StyledButton>
                        {isAdmin && (
                            <StyledButton
                                variant="contained"
                                startIcon={<AdminPanelSettingsIcon />}
                                component={Link} to="/user-list"
                            >
                                רשימת לידים חמים🔥
                            </StyledButton>
                        )}
                        <StyledButton
                            variant="contained"
                            startIcon={<HomeIcon />}
                            component={Link} to="/home"
                        >
                            דף הבית
                        </StyledButton>
                    </Box>
                </Toolbar>
            </StyledAppBar>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/list' element={<ProductList />} />
                <Route path="/google-login" element={<GoogleLoginButton />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path='/about' element={<About />} />
                <Route path='/cart' element={<CartComponent />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                {/* Protected Routes */}
                <Route path="/add-product" element={<PrivateRoute element={<AddProduct />} />} />
                <Route path="/edit-product/:id" element={<PrivateRoute element={<EditProduct />} />} />
                <Route path="/user-list" element={<PrivateRoute element={<UserList />} />} />
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
            {showLoginDialog && (
                <Dialog open onClose={handleToggleDialog} maxWidth="xs" fullWidth dir='rtl'>
                    <DialogTitle>
                        <DialogIconButton
                            edge="end"
                            color="inherit"
                            onClick={handleToggleDialog}
                            aria-label="close"
                            sx={{ position: 'absolute', right: 8, top: 8 }}
                        >
                            <CloseIcon />
                        </DialogIconButton>
                        הכנס באמצעות גוגל
                    </DialogTitle>
                    <DialogContent>
                        <GoogleLoginButton onClose={handleToggleDialog} />
                    </DialogContent>
                </Dialog>
            )}
            <Footer />
        </HashRouter>
    );
};

export default AppRoutes;
