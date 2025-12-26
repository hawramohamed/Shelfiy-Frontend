import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

function SupplierList() {
  const { user } = useContext(UserContext);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await fetch('/suppliers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch suppliers');
        const data = await res.json();
        setSuppliers(data);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  if (loading) return <p>Loading suppliers...</p>;

  return (
    <div className="supplier-list">
      <h1>Supplier List</h1>

      {user && (
        <Link to={`/products/${user._id}/suppliers/new`}>
          <button>Create New Supplier</button>
        </Link>
      )}

      {suppliers.length === 0 ? (
        <p>No suppliers found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.contact}</td>
                <td>{s.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SupplierList;