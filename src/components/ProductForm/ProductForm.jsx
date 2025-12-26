import { useState, useEffect } from 'react';
import { addProduct, updateProduct, getProduct } from '../../services/productService';
import { useParams, useNavigate } from 'react-router';

function ProductForm({ userId }) {
  const { productId } = useParams(); // grab productId from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", price: 0, stock: 0, description: "" });
  const [error, setError] = useState("");

  // If editing, fetch product details to prefill form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const existing = await getProduct(userId, productId);
          setFormData(existing);
        }
      } catch (err) {
        setError("Failed to load product");
      }
    };
    fetchProduct();
  }, [userId, productId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productId) {
        await updateProduct(userId, productId, formData);
      } else {
        await addProduct(userId, {...formData, suppliers: []});
      }
      navigate("/products");
    } catch (err) {
      console.error("Save failed:", err);
      setError(err.message);

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <button type="submit">{productId ? "Update Product" : "Add Product"}</button>
    </form>
  );
}

export default ProductForm;