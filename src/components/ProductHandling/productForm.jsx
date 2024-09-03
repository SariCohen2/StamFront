import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ initialProduct, onSave }) => {
    const [product, setProduct] = useState({
        Name: '',
        Description: '',
        Price: '',
        Date: '',
        More: '',
        Image: '',
        ...initialProduct, // מאתחל את השדות עם הנתונים הראשוניים אם יש
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProduct({ ...product, Image: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(product); // מפעיל את הפונקציה ששולחת את המוצר לשמירה
    };
    const cancel=()=>{
        navigate("/list")
    }

    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, padding: 2 }} >
            <CardContent >
                <Typography variant="h5" gutterBottom >
                    {initialProduct ? 'Edit Product' : 'Add New Product'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField dir='rtl'
                                label="שם המוצר"
                                name="Name"
                                value={product.Name}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                dir='rtl'
                                label="תיאור נוסף"
                                name="Description"
                                value={product.Description}
                                onChange={handleInputChange}
                                fullWidth
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                dir='rtl'
                                label="מחיר"
                                name="Price"
                                value={product.Price}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                dir='rtl'
                                label="תאריך"
                                name="Date"
                                value={product.Date}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                type="date"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                dir='rtl'
                                label="עוד מידע"
                                name="More"
                                value={product.More}
                                onChange={handleInputChange}
                                fullWidth
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                component="label"
                                fullWidth
                            >
                                העלה תמונה
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {product.Image && <img src={product.Image} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                שמור
                            </Button>
                            <Button sx={{backgroundColor:"red",marginTop:'10px'}} fullWidth onClick={cancel}>
                                בטל
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProductForm;
