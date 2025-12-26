// src/components/Suppliers/SupplierForm.jsx
import { useState, useEffect } from 'react';
import { addSupplier, updateSupplier, getSupplier } from '../../services/supplierService';
import { useParams, useNavigate } from 'react-router';

function SupplierForm({ userId }) {
  const { productId, supplierId } = useParams(); // grab IDs from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", contact: "", address: "" });
  const [error, setError] = useState("");

  // If editing, fetch supplier details to prefill form
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        if (supplierId) {
          const existing = await getSupplier(userId, productId, supplierId);
          setFormData(existing);
        }
      } catch (err) {
        setError("Failed to load supplier");
      }
    };
    fetchSupplier();
  }, [userId, productId, supplierId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (supplierId) {
        await updateSupplier(userId, productId, supplierId, formData);
      } else {
        await addSupplier(userId, productId, formData);
      }
      navigate(`/products/${productId}/suppliers`);
    } catch (err) {
      setError("Failed to save supplier");
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
        name="contact"
        placeholder="Contact"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <button type="submit">{supplierId ? "Update Supplier" : "Add Supplier"}</button>
    </form>
  );
}

export default SupplierForm;