const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // מצב טעינה

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false); // סיום מצב טעינה
      }
    };

    loadProduct();
  }, [id]);

  const handleSave = async (updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct);
      await Swal.fire({
        icon: 'success',
        title: 'מוצר עודכן בהצלחה!',
        text: 'המוצר עודכן לרשימה בהצלחה.',
        confirmButtonText: 'אוקי'
      });
      navigate('/list');
    } catch (error) {
      console.error('Error updating product:', error);
      await Swal.fire({
        icon: 'error',
        title: 'שגיאה!',
        text: 'אירעה שגיאה בעדכון המוצר.',
        confirmButtonText: 'אוקי'
      });
    }
  };

  if (loading) {
    return <div>טוען מוצר...</div>; // הודעת טעינה
  }

  return product ? (
    <ProductForm product={product} onSave={handleSave} />
  ) : (
    <div>לא נמצא מוצר</div>
  );
};
