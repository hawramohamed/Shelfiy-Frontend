import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import { getAllSuppliers, updateSupplier, deleteSupplier } from '../../services/supplierService';

function SupplierList() {
  const { user } = useContext(UserContext);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
        setError("Failed to load suppliers");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (supplierId, productId) => {
    try {
      await deleteSupplier(user._id, productId, supplierId);
      setSuppliers(suppliers.filter(s => s._id !== supplierId));
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete supplier");
    }
  };

  if (loading) return <p>Loading suppliers...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="supplier-list">
      <h1>Supplier</h1>

      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
                <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.contact}</td>
                    <td>{s.address}</td>
                    <td>
                        <Link to={`/products/${s.productId}/suppliers/${s._id}/edit`}>
                            <button>Edit</button>
                        </Link>
                        {user.role === "admin" && (
                            <button onClick={() => handleDelete(s.userId, s.productId, s._id)}>Delete</button>
                        )}

                    </td>
                </tr>
            ))}
            </tbody>
        </table>
      )}
    </div>
  );
}

export default SupplierList;