import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Input, Row, Col, Skeleton, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, TagFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, fetchProducts } from '../../services/productService';

const { Meta } = Card;
const { Search } = Input;

const ProductItem = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const isAdmin = () => sessionStorage.getItem('role') === 'true';

  const handleDelete = async () => {
    try {
      await deleteProduct(product.Id);
      onDelete(product.Id);
      message.success('המוצר נמחק בהצלחה');
    } catch (error) {
      message.error('שגיאה במחיקת המוצר');
    }
  };

  return (
    <Card
      hoverable
      cover={<img alt={product.Name} src={product.Image} style={{ height: '200px', objectFit: 'cover' }} />}
      actions={[
        isAdmin() && (
          <>
            <EditOutlined onClick={() => navigate(`/edit-product/${product.Id}`)} key="edit" />
            <Popconfirm
              title="האם אתה בטוח שברצונך למחוק מוצר זה?"
              onConfirm={handleDelete}
              okText="כן"
              cancelText="לא"
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>
          </>
        ),
      ]}
    >
      {product.OnSale && (
        <TagFilled style={{ color: 'red', position: 'absolute', top: 10, left: 10 }}>במבצע</TagFilled>
      )}
      <Meta
        title={product.Name}
        description={
          <>
            <Typography.Text strong>₪{product.Price}</Typography.Text>
            <br />
            <Typography.Text type="secondary">{product.Description}</Typography.Text>
          </>
        }
      />
    </Card>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        message.error('שגיאה בטעינת המוצרים');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleSearch = (value) => {
    setFilteredProducts(
      products.filter((product) =>
        product.Name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Search
            placeholder="חפש לפי שם"
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            style={{ maxWidth: '400px', marginBottom: '20px' }}
          />
          { isAdmin()&&<Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/add-product')}
            style={{ marginBottom: '20px', backgroundColor: '#3e2723', borderRadius: '20px' }}
          >
            הוספת מוצר
          </Button>}
        </Col>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Skeleton active />
            </Col>
          ))
        ) : (
          filteredProducts.map((product) => (
            <Col xs={12} sm={12} md={8} key={product.Id}>
              <ProductItem product={product} onDelete={(id) => setProducts(products.filter((p) => p.Id !== id))} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default ProductList;
