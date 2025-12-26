import { useState } from 'react';
import { addProduct, updateProduct } from '../../services/productService';

function ProductForm({ userId, product, onSuccess }) {
  const [formData, setFormData] = useState(
    product || { name: "", price: 0, stock: 0, description: "" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        const updated = await updateProduct(userId, product._id, formData);
        onSuccess(updated);
      } else {
        const created = await addProduct(userId, formData);
        onSuccess(created);
      }
      setFormData({ name: "", price: 0, stock: 0, description: "" });
    } catch (err) {
      setError("Failed to save product");
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
      <button type="submit">{product ? "Update Product" : "Add Product"}</button>
    </form>
  );
}

export default ProductForm;