import React, { useEffect, useState } from 'react';
import { Grid, Box, TextField, InputAdornment, Button, Fade, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ProductItem from '../productItem/productItem';
import { deleteProduct, fetchProducts } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        loadProducts();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) =>
                    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, products]);

    const isAdmin = () => sessionStorage.getItem('role') === 'true';

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(product => product.Id !== id));
            setFilteredProducts(filteredProducts.filter(product => product.Id !== id));
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    return (
        <Box sx={{ paddingX: '10vw', width: '100%', boxSizing: 'border-box', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ marginBottom: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {isAdmin() && (
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            backgroundColor: '#3e2723',
                            borderRadius: '25px',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                            paddingX: '20px',
                            paddingY: '10px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                        }}
                        startIcon={<AddIcon />}
                        onClick={handleAddProduct}
                    >
                        הוספת מוצר
                    </Button>
                )}
                <TextField
                    variant="outlined"
                    placeholder="חפש על פי שם"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#3e2723',
                                        borderRadius: '50%',
                                        width: '36px',
                                        height: '36px',
                                    }}
                                >
                                    <SearchIcon sx={{ color: '#ffffff' }} />
                                </Box>
                            </InputAdornment>
                        ),
                        sx: {
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                backgroundColor: '#ffffff',
                                border: '2px solid #3e2723',
                                transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                    boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.4)',
                                    borderColor: '#f50057',
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#000000',
                                fontWeight: 'bold',
                                textAlign: 'right',
                            },
                        },
                    }}
                    sx={{
                        width: '100%',
                        maxWidth: 400, // הצרת השדה
                        marginLeft: 'auto',
                        backgroundColor: '#ffffff',
                        marginTop: '20px', // מרחק של 20px מלמעלה
                    }}
                />
            </Box>
            <Grid container spacing={4} justifyContent="center">
                {loading ? (
                    Array.from({ length: 10 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: '8px' }} />
                        </Grid>
                    ))
                ) : (
                    filteredProducts.map((product, index) => (
                        <Fade in={true} key={product.Id} style={{ transitionDelay: `${index * 100}ms` }}>
                            <Grid item xs={12} sm={6} md={4}>
                                <ProductItem product={product} onDelete={handleDelete} />
                            </Grid>
                        </Fade>
                    ))
                )}
            </Grid>
        </Box>
    );
};

export default ProductList;
