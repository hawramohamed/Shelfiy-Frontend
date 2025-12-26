import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../services/productService';

function ProductList() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(user._id, productId);
      setProducts(products.filter(p => p._id !== productId)); // ✅ update UI
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete product");
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="product-list">
      <h1>Product</h1>

      {user && (
        <Link to="/products/new">
          <button>Create New Product</button>
        </Link>
      )}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Suppliers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.description}</td>
                <td>
                  {p.suppliers && p.suppliers.length > 0
                    ? p.suppliers.map(s => s.name).join(', ')
                    : 'No suppliers'}
                </td>
                <td>
                  <Link to={`/products/${p._id}/edit`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;