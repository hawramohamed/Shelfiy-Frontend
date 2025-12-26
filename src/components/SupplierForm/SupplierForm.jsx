import { useState } from 'react';
import { addSupplier, updateSupplier } from '../../services/supplierService';

function SupplierForm({ userId, productId, supplier, onSuccess }) {
  const [formData, setFormData] = useState(
    supplier || { name: "", contact: "", address: "" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (supplier) {
        const updated = await updateSupplier(userId, productId, supplier._id, formData);
        onSuccess(updated);
      } else {
        const created = await addSupplier(userId, productId, formData);
        onSuccess(created);
      }
      setFormData({ name: "", contact: "", address: "" });
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
      <button type="submit">{supplier ? "Update Supplier" : "Add Supplier"}</button>
    </form>
  );
}

export default SupplierForm;