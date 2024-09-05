const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [openZoom, setOpenZoom] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true); // מצב טעינה

  useEffect(() => {
    const fetchTheProduct = async () => {
      try {
        const fetchedProduct = await fetchProduct(productId);
        setProduct(fetchedProduct);

        // בדיקת האם המוצר כבר קיים בסל ואם כן, עדכון הכמות בהתאם
        const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        const existingProduct = selectedProducts.find(item => item.Id === fetchedProduct.Id);
        if (existingProduct) {
          setQuantity(existingProduct.quantity);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false); // סיום מצב טעינה
      }
    };
    fetchTheProduct();
  }, [productId]);

  if (loading) {
    return <Typography>טוען...</Typography>;
  }

  return product ? (
    <ProductDetailContainer>
      {/* התוכן של תצוגת המוצר */}
    </ProductDetailContainer>
  ) : (
    <Typography>מוצר לא נמצא</Typography>
  );
};
