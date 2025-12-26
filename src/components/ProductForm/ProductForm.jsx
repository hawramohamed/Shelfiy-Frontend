import { useState, useEffect } from 'react';
import { addProduct, updateProduct, getProduct } from '../../services/productService';
import { useParams, useNavigate } from 'react-router';

function ProductForm({ userId }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",   // ✅ empty string so placeholder shows
    stock: "",   // ✅ empty string so placeholder shows
    description: "",
    suppliers: []
  });

  const [supplierInput, setSupplierInput] = useState({ name: "", contact: "", address: "" });
  const [error, setError] = useState("");

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

  const handleSupplierChange = (e) => {
    setSupplierInput({ ...supplierInput, [e.target.name]: e.target.value });
  };

  const addSupplierToList = () => {
    if (!supplierInput.name) return; // require name
    setFormData({
      ...formData,
      suppliers: [...formData.suppliers, supplierInput]
    });
    setSupplierInput({ name: "", contact: "", address: "" }); // reset input
  };

  const removeSupplier = (idx) => {
    setFormData({
      ...formData,
      suppliers: formData.suppliers.filter((_, i) => i !== idx)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productId) {
        await updateProduct(userId, productId, formData);
      } else {
        await addProduct(userId, formData);
      }
      navigate("/products");
    } catch (err) {
      console.error("Save failed:", err);
      setError(err.message);
    }
  };

  return (
    <>
      <h2>{productId ? "Edit Product" : "Add New Product"}</h2>

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

        <h3>Add Supplier</h3>
        <input
          name="name"
          placeholder="Supplier Name"
          value={supplierInput.name}
          onChange={handleSupplierChange}
        />
        <input
          name="contact"
          placeholder="Contact"
          value={supplierInput.contact}
          onChange={handleSupplierChange}
        />
        <input
          name="address"
          placeholder="Address"
          value={supplierInput.address}
          onChange={handleSupplierChange}
        />
        <button type="button" onClick={addSupplierToList}>Add Supplier</button>

        {formData.suppliers.length > 0 && (
          <ul>
            {formData.suppliers.map((s, idx) => (
              <li key={idx}>
                {s.name} ({s.contact})
                <button type="button" onClick={() => removeSupplier(idx)}>Remove</button>
              </li>
            ))}
          </ul>
        )}

        <button type="submit">{productId ? "Update Product" : "Add Product"}</button>
      </form>
    </>
  );
}

export default ProductForm;