import { useEffect, useState, useContext } from 'react';
import { getSuppliers } from '../../services/supplierService';
import { UserContext } from '../../contexts/UserContext';

function SupplierList({ productId }) {
  const { user } = useContext(UserContext);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers(user._id, productId);
        setSuppliers(data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
        setError("Failed to load suppliers");
      }
    };

    if (user) {
      fetchSuppliers();
    }
  }, [user, productId]);

  return (
    <div>
      <h3>Suppliers</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {suppliers.map(s => (
          <li key={s._id}>{s.name} — {s.contact}</li>
        ))}
      </ul>
    </div>
  );
}

export default SupplierList;