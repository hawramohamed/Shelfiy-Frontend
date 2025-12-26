// src/components/Suppliers/SupplierList.jsx
import { useEffect, useState, useContext } from 'react';
import { getAllSuppliers, deleteSupplier } from '../../services/supplierService';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router';

function SupplierList() {
  const { user } = useContext(UserContext);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");

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

  const handleDelete = async (supplier) => {
    try {
      await deleteSupplier(supplier.userId, supplier.productId, supplier._id);
      setSuppliers(suppliers.filter(s => s._id !== supplier._id));
    } catch (err) {
      setError("Failed to delete supplier");
    }
  };

  return (
    <div>
      <h2>Suppliers</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/suppliers/new">Add Supplier</Link>
      <ul>
        {suppliers.map(s => (
          <li key={s._id}>
            {s.name} — {s.contact} — {s.address}
            <Link to={`/suppliers/${s._id}/edit`}>Edit</Link>
            <button onClick={() => handleDelete(s)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SupplierList;