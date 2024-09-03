import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Divider, Box, Tooltip, Avatar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // אייקון לוגין
import Home from './home';
import ProductList from './productList/productList';
import AddProduct from './ProductHandling/addProduct';
import EditProduct from './ProductHandling/editProduct';
import Footer from './footer';
import AdminLogin from './adminLogin';
import About from './about';
import CartComponent from './BuyingProducts/cart';
import ProductDetail from './BuyingProducts/productDetails';
import GoogleLoginButton from './Login'; // קומפוננטת לוגין
import PrivateRoute from './privateRoute';
import UserList from './userList';

export default function AppRoutes() {
    // קבלת פרטי המשתמש מהלוקל-סטורג'
    const name = sessionStorage.getItem('name');
    const picture = sessionStorage.getItem('picture');
    
    return (
        <BrowserRouter>
            <AppBar position="static" sx={{ backgroundColor: '#3e2723', color: '#ffffff' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
                        <HomeIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: 'David Libre', fontWeight: 'bold' }}>
                        סופר סת"ם
                    </Typography>
                    <Tooltip title={name ? `שלום, ${name}` : "הכנס עם שם משתמש"}>
                        <IconButton color="inherit">
                            <GoogleLoginButton></GoogleLoginButton>
                            {picture ? <Avatar src={picture} /> : <AccountCircleIcon />}
                        </IconButton>
                    </Tooltip>
                </Toolbar>
                <Divider sx={{ backgroundColor: '#795548' }} />
                <Toolbar>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', width: '100%' }}>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            startIcon={<ListIcon />} 
                            component={Link} to="/list" 
                            sx={{ 
                                backgroundColor: '#5d4037', 
                                '&:hover': { 
                                    backgroundColor: '#4e342e' 
                                }, 
                                borderRadius: '20px', 
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.3)' 
                            }}
                        >
                            רשימת מוצרים
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            startIcon={<InfoIcon />} 
                            component={Link} to="/about" 
                            sx={{ 
                                backgroundColor: '#5d4037', 
                                '&:hover': { 
                                    backgroundColor: '#4e342e' 
                                }, 
                                borderRadius: '20px', 
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.3)' 
                            }}
                        >
                            אודות
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            startIcon={<InfoIcon />} 
                            component={Link} to="/cart" 
                            sx={{ 
                                backgroundColor: '#5d4037', 
                                '&:hover': { 
                                    backgroundColor: '#4e342e' 
                                }, 
                                borderRadius: '20px', 
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.3)' 
                            }}
                        >
                            סל קניות
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            startIcon={<InfoIcon />} 
                            component={Link} to="/user-list" 
                            sx={{ 
                                backgroundColor: '#5d4037', 
                                '&:hover': { 
                                    backgroundColor: '#4e342e' 
                                }, 
                                borderRadius: '20px', 
                                boxShadow: '0px 4px 10px rgba(0,0,0,0.3)' 
                            }}
                        >
                            רשימת לידים חמים❤️‍🔥
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/list' element={<ProductList />}></Route>
                <Route path="/google-login" element={<GoogleLoginButton />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path='/about' element={<About/>}></Route>
                <Route path='/cart' element={<CartComponent/>}></Route>
                <Route path="/product/:productId" element={<ProductDetail />} />
                
                {/* Protected Routes */}
                <Route path="/add-product" element={<PrivateRoute element={<AddProduct />} />} />
                <Route path="/edit-product/:id" element={<PrivateRoute element={<EditProduct />} />} />
                <Route path="/user-list" element={<PrivateRoute element={<UserList />} />} />

            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}
