import { useEffect, useState, useContext } from 'react';
import { getAllProducts, deleteProduct } from '../../services/productService';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router';

function ProductList() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

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
      await deleteProduct(user._id, id);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/products/new">Add Product</Link>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.name} — ${p.price} — {p.stock} in stock
            <Link to={`/products/${p._id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;