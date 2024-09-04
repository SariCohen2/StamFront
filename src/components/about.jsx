import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import backgroundImage from '../assets/backgroundImage.jpg'; // תמונת רקע מרשימה
import avatar from '../assets/avatar3.png'
const goToList=()=>{
    window.location.href="/StamFront/list";

}

// אנימציית פייד-אין
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// אנימציית סיבוב לאייקון
// const rotate = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

const AboutSection = styled(Box)({
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '80px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
});

const StyledCard = styled(Card)({
    maxWidth: 800,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '30px',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)',
    animation: `${fadeIn} 1s ease-in-out`,
    textAlign: 'center',
    padding: '40px',
});

const StyledAvatar = styled(Avatar)({
    width: 150,
    height: 150,
    margin: '0 auto 30px',
    // animation: `${rotate} 4s infinite linear`,
    backgroundImage: `url(${avatar})`,

});

const StyledTypography = styled(Typography)({
    color: '#3e2723',
    fontWeight: 'bold',
    marginBottom: '20px',
});

const Paragraph = styled(Typography)({
    fontSize: '1.5rem',
    lineHeight: 1.8,
    color: '#5d4037',
    marginBottom: '30px',
    animation: `${fadeIn} 1.5s ease-in-out`,
});

const StyledButton = styled(Button)({
    backgroundColor: '#3e2723',
    color: '#fff',
    padding: '15px 30px',
    borderRadius: '30px',
    boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.3)',
    textTransform: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    animation: `${fadeIn} 2s ease-in-out`,
    '&:hover': {
        backgroundColor: '#5d4037',
    },
});

const About = () => {
    return (
        <AboutSection>
            <StyledCard>
                <StyledAvatar src="https://placekitten.com/300/300" alt="Avatar" />
                <StyledTypography variant="h3">
                    היי לכם! ברוכים הבאים לעולמי
                </StyledTypography>
                <Paragraph variant="body1">
                    שמי קובי, נשוי לאישה מדהימה ואבא לילד מתוק. במשך שנתיים למדתי והתאמנתי באומנות הסת"ם תחת המורים הטובים ביותר בארץ ובחו"ל. 
                    לאחר מבחנים קשים, קיבלתי תעודת אמן מוסמך מארגון משמרת סת"ם. אני מזמין אתכם להתרשם מהעבודות שלי, להרגיש את הדיוק וההשקעה בכל יצירה.
                </Paragraph>
                <StyledButton onClick={goToList}>
                    להתרשמות מהעבודות שלי
                </StyledButton>
                
            </StyledCard>
        </AboutSection>
    );
};

export default About;
