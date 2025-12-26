import { useEffect, useState, useContext } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productService';
import { UserContext } from '../../contexts/UserContext';
import ProductForm from './ProductForm';

function ProductList({ userId }) {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      }
    };
    if (user) fetchProducts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(userId, id);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  const handleSuccess = (product) => {
    if (editingProduct) {
      setProducts(products.map(p => p._id === product._id ? product : p));
      setEditingProduct(null);
    } else {
      setProducts([...products, product]);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} — ${p.price} — {p.stock} in stock
            <button onClick={() => setEditingProduct(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h4>{editingProduct ? "Edit Product" : "Add Product"}</h4>
      <ProductForm
        userId={userId}
        product={editingProduct}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default ProductList;