import React from 'react';
import Slider from 'react-slick';
import { Container, Box, Typography, Button, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// תמונה מתאימה לדף
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(https://images.pexels.com/photos/5986492/pexels-photo-5986492.jpeg?auto=compress&cs=tinysrgb&w=600)', // תמונה מתאימה לדף
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#ffffff',
  padding: '80px 0',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '70vh',
  width: '100%',
  backgroundBlendMode: 'overlay',
  backgroundColor: 'rgba(0,0,0,0.5)', // חצי שקיפות כדי לשפר את נראות הטקסט
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  maxWidth: '100%',
  margin: theme.spacing(2),
  boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  borderRadius: '15px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#fff', // צבע אחיד רקע
}));

const ServiceCardContent = styled(CardContent)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0,0,0,0.6)', // רקע חצי שקוף
  color: '#fff',
  padding: theme.spacing(2),
  borderTop: '1px solid #ddd',
}));

const CallToAction = styled(Box)(({ theme }) => ({
  backgroundColor: '#3e2723',
  color: '#ffffff',
  padding: theme.spacing(6, 0),
  textAlign: 'center',
  borderRadius: '15px',
  boxShadow: '0px 8px 20px rgba(0,0,0,0.3)',
  marginTop: theme.spacing(6),
}));

const TestimonialsSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  textAlign: 'center',
}));

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,       // להפעלת הסליידר אוטומטית
  autoplaySpeed: 3000,  // זמן ההשהיה בין השקפים
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontFamily: 'David Libre', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          סופר סת"ם מומחה- ואומן
        </Typography>
        <Typography variant="h5" component="p" sx={{ marginBottom: 4, textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
          מומחה בכתיבת סת"ם עם יחס אישי ושירות מקצועי
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          sx={{ 
            padding: '10px 30px', 
            fontSize: '18px', 
            borderRadius: '25px', 
            backgroundColor: '#6d4c41', 
            boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
            '&:hover': {
              backgroundColor: '#5d4037',
            }
          }} href='StamFront/list'
        >
          <ArrowForwardIcon sx={{ marginRight: 1 }} />
          ראה את המוצרים שלנו
        </Button>
      </HeroSection>

      {/* Services Section */}
      <Box sx={{ padding: '60px 0', textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
          השירותים שלנו
        </Typography>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard>
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/5986493/pexels-photo-5986493.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt='כתיבת סת"ם'
              />
              <ServiceCardContent dir='rtl'>
                <Typography variant="h6" component="div" sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
                  כתיבת סת"ם
                </Typography>
                <Typography variant="body2"  color="white">
                  כתיבת ספרי תורה, תפילין ומזוזות באיכות הגבוהה ביותר.
                </Typography>
              </ServiceCardContent>
            </ServiceCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ServiceCard>
              <CardMedia
                component="img"
                height="200"
                image="https://images.pexels.com/photos/5986495/pexels-photo-5986495.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="בדיקת תפילין"
              />
              <ServiceCardContent>
                <Typography variant="h6" component="div" sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
                  בדיקת תפילין ומזוזות
                </Typography>
                <Typography variant="body2" color="white">
                  שירות בדיקת תפילין ומזוזות לשמירה על קדושת הכתיבה.
                </Typography>
              </ServiceCardContent>
            </ServiceCard>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <CallToAction sx={{width:"80vw",opacity:0.8,margin:"0 auto"}}>
        <Typography variant="h4" component="h2" dir='rtl' gutterBottom sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
          רוצה לדעת עוד?
        </Typography>
        <Typography variant="h6" component="p" sx={{ marginBottom: 4 }}>
          לחץ למידע נוסף על המוצרים והשירותים שלנו
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          sx={{ 
            padding: '10px 30px', 
            fontSize: '18px', 
            borderRadius: '25px', 
            backgroundColor: '#6d4c41', 
            boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
            '&:hover': {
              backgroundColor: '#5d4037',
            } 
          }} href='StamFront/list'
        >
          <ArrowForwardIcon sx={{ marginRight: 1 }} />
          ראה את המוצרים שלנו
        </Button>
      </CallToAction>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'David Libre', fontWeight: 'bold' }}>
          מה אומרים עלינו
        </Typography>
        <Slider {...sliderSettings}>
          <Box sx={{ padding: 4, backgroundColor: '#d7ccc8', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', maxWidth: '600px', margin: 'auto' }}>
            <Typography variant="body1" color="text.primary" dir='rtl' sx={{ fontStyle: 'italic' }}>
              "השירות היה מקצועי ואדיב. המוצר היה איכותי ומדויק."
            </Typography>
            <Typography variant="subtitle1" dir='rtl' component="div" sx={{ marginTop: 2, fontFamily: 'David Libre', fontWeight: 'bold' }}>
              יוסי מירושלים
            </Typography>
          </Box>
          <Box sx={{ padding: 4, backgroundColor: '#d7ccc8', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', maxWidth: '600px', margin: 'auto' }}>
            <Typography variant="body1" color="text.primary" dir='rtl' sx={{ fontStyle: 'italic' }}>
              "עבודה מקצועית עם תשומת לב לפרטים. ממליץ מאוד!"
            </Typography>
            <Typography variant="subtitle1" dir='rtl' component="div" sx={{ marginTop: 2, fontFamily: 'David Libre', fontWeight: 'bold' }}>
              מיכל מתל אביב
            </Typography>
          </Box>
          <Box sx={{ padding: 4, backgroundColor: '#d7ccc8', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', maxWidth: '600px', margin: 'auto' }}>
            <Typography variant="body1" color="text.primary" dir='rtl' sx={{ fontStyle: 'italic' }}>
              "שירות אדיב, מקצועי ואמין. הייתי מאוד מרוצה מהתוצאה."
            </Typography>
            <Typography variant="subtitle1" dir='rtl' component="div" sx={{ marginTop: 2, fontFamily: 'David Libre', fontWeight: 'bold' }}>
              יעל מברצליה
            </Typography>
          </Box>
          <Box sx={{ padding: 4, backgroundColor: '#d7ccc8', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', maxWidth: '600px', margin: 'auto' }}>
            <Typography variant="body1" color="text.primary" dir='rtl' sx={{ fontStyle: 'italic' }}>
              "פשוט מדהים! לא יכולתי לבקש יותר טוב מזה."
            </Typography>
            <Typography variant="subtitle1" dir='rtl' component="div" sx={{ marginTop: 2, fontFamily: 'David Libre', fontWeight: 'bold' }}>
              אבי מהוד השרון
            </Typography>
          </Box>
          <Box sx={{ padding: 4, backgroundColor: '#d7ccc8', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', maxWidth: '600px', margin: 'auto' }}>
            <Typography variant="body1" color="text.primary" dir='rtl' sx={{ fontStyle: 'italic' }}>
              "שירות מסור ואיכות גבוהה. מומלץ בחום!"
            </Typography>
            <Typography variant="subtitle1" dir='rtl' component="div" sx={{ marginTop: 2, fontFamily: 'David Libre', fontWeight: 'bold' }}>
              תמרה מבני ברק
            </Typography>
          </Box>
        </Slider>
      </TestimonialsSection>
    </>
  );
}
