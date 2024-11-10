import React from 'react';
import { Layout, Typography, Row, Col, Button, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, FacebookFilled, InstagramFilled, WhatsAppOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function CustomFooter() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <Footer style={{ backgroundColor: '#1f1f1f', color: '#ffffff', padding: '40px 0' }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ color: '#ffffff' }}>סופר סת"ם</Title>
          <Text style={{ color: '#b0b0b0' }}>כתיבת ספרי תורה, תפילין ומזוזות בכתב יד מסורתי.</Text>
        </Col>
        <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ color: '#ffffff' }}>צור קשר</Title>
          <Button type="link" href="mailto:info@supersofrim.com" icon={<MailOutlined />} style={{ color: '#ffffff' }}>info@supersofrim.com</Button>
          <br />
          <Button type="link" href="tel:+972505555555" icon={<PhoneOutlined />} style={{ color: '#ffffff' }}>050-555-5555</Button>
        </Col>
        <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ color: '#ffffff' }}>כתובת</Title>
          <Button type="link" href="https://www.google.com/maps" target="_blank" icon={<EnvironmentOutlined />} style={{ color: '#ffffff' }}>
            רחוב הדוגמה 10, ירושלים
          </Button>
        </Col>
        <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
          <Title level={4} style={{ color: '#ffffff' }}>עקבו אחרינו</Title>
          <Button type="link" href="https://www.facebook.com" icon={<FacebookFilled />} style={{ color: '#ffffff' }} />
          <Button type="link" href="https://www.instagram.com" icon={<InstagramFilled />} style={{ color: '#ffffff' }} />
          <Button type="link" href="https://wa.me/972505555555" icon={<WhatsAppOutlined />} style={{ color: '#ffffff' }} />
        </Col>
      </Row>
      <Divider style={{ borderColor: '#b0b0b0', margin: '20px 0' }} />
      <Text style={{ display: 'block', textAlign: 'center', color: '#b0b0b0' }}>
        © {new Date().getFullYear()} שרי בניית אתרים - כל הזכויות שמורות.
      </Text>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          type="ghost"
          onClick={handleAdminLogin}
          style={{
            borderRadius: '20px',
            borderColor: '#ffffff',
            color: '#ffffff',
            padding: '6px 16px',
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease',
          }}
        >
          כניסה למנהל
        </Button>
      </div>
    </Footer>
  );
}
