import { useEffect, useState, useContext } from 'react';
import { getAllSuppliers, deleteSupplier } from '../../services/supplierService';
import { UserContext } from '../../contexts/UserContext';
import SupplierForm from './SupplierForm';

function SupplierList({ userId, productId }) {
  const { user } = useContext(UserContext);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [editingSupplier, setEditingSupplier] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data);
      } catch (err) {
        setError("Failed to load suppliers");
      }
    };
    if (user) fetchSuppliers();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(userId, productId, id);
      setSuppliers(suppliers.filter(s => s._id !== id));
    } catch (err) {
      setError("Failed to delete supplier");
    }
  };

  const handleSuccess = (supplier) => {
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => s._id === supplier._id ? supplier : s));
      setEditingSupplier(null);
    } else {
      setSuppliers([...suppliers, supplier]);
    }
  };

  return (
    <div>
      <h3>Suppliers</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {suppliers.map(s => (
          <li key={s._id}>
            {s.name} — {s.contact} — {s.address}
            <button onClick={() => setEditingSupplier(s)}>Edit</button>
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h4>{editingSupplier ? "Edit Supplier" : "Add Supplier"}</h4>
      <SupplierForm
        userId={userId}
        productId={productId}
        supplier={editingSupplier}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default SupplierList;