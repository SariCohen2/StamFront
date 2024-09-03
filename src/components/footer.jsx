import React from 'react';
import { Box, Typography, Grid, IconButton, Divider, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/admin-login');
    };

    return (
        <Box sx={{ backgroundColor: '#3e2723', color: '#ffffff', padding: '20px 0' }}>
            <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
                        סופר סת"ם
                    </Typography>
                    <Typography variant="body1">
                        כתיבת ספרי תורה, תפילין ומזוזות בכתב יד מסורתי.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
                        צור קשר
                    </Typography>
                    <IconButton href="mailto:info@supersofrim.com" sx={{ color: '#ffffff' }}>
                        <EmailIcon />
                    </IconButton>
                    <Typography variant="body1">
                        info@supersofrim.com
                    </Typography>
                    <IconButton href="tel:+972505555555" sx={{ color: '#ffffff' }}>
                        <PhoneIcon />
                    </IconButton>
                    <Typography variant="body1">
                        050-555-5555
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
                        כתובת
                    </Typography>
                    <IconButton href="https://www.google.com/maps" target="_blank" sx={{ color: '#ffffff' }}>
                        <LocationOnIcon />
                    </IconButton>
                    <Typography variant="body1">
                        רחוב הדוגמה 10, ירושלים
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
                        עקבו אחרינו
                    </Typography>
                    <Box>
                        <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: '#ffffff' }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="https://www.instagram.com" target="_blank" sx={{ color: '#ffffff' }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton href="https://wa.me/972505555555" target="_blank" sx={{ color: '#ffffff' }}>
                            <WhatsAppIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ backgroundColor: '#795548', margin: '20px 0' }} />
            <Typography variant="body2" sx={{ textAlign: 'center', fontFamily: 'David Libre' }}>
                © {new Date().getFullYear()} סופר סת"ם - כל הזכויות שמורות.
            </Typography>
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                <Button
                    variant="outlined"  // Change to outlined for a less bold look
                    color="secondary"
                    onClick={handleAdminLogin}
                    sx={{
                        borderRadius: '20px',
                        padding: '6px 12px',  // Slightly smaller padding
                        borderColor: '#ffffff',  // Use a lighter border color
                        color: '#ffffff',
                        '&:hover': {
                            borderColor: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Slightly darker hover color
                        },
                        boxShadow: 'none',  // Remove shadow for a more subtle look
                    }}
                >
                    כניסה למנהל
                </Button>
            </Box>
        </Box>
    );
}
