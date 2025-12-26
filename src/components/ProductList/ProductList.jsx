import { useEffect, useState, useContext } from 'react';
import { getProducts } from '../../services/productService';
import { UserContext } from '../../contexts/UserContext';

function ProductList() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(user._id);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [user]);

  return (
    <div>
      <h2>Products</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {products.map(p => (
          <li key={p._id}>{p.name} — {p.stock} in stock</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;