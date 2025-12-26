const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getAllSuppliers = async () => {
  const res = await fetch(`${BASE_URL}/suppliers`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error("Failed to fetch suppliers");
  return res.json();
};

const addSupplier = async (userId, productId, supplierData) => {
  const res = await fetch(`${BASE_URL}/suppliers/${userId}/products/${productId}/new`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(supplierData)
  });
  if (!res.ok) throw new Error("Failed to add supplier");
  return res.json();
};

const getSupplier = async (userId, productId, supplierId) => {
  const res = await fetch(`${BASE_URL}/suppliers/${userId}/products/${productId}/${supplierId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error("Failed to fetch supplier");
  return res.json();
};

const updateSupplier = async (userId, productId, supplierId, supplierData) => {
  const res = await fetch(`${BASE_URL}/suppliers/${userId}/products/${productId}/${supplierId}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(supplierData)
  });
  if (!res.ok) throw new Error("Failed to update supplier");
  return res.json();
};

const deleteSupplier = async (userId, productId, supplierId) => {
  const res = await fetch(`${BASE_URL}/suppliers/${userId}/products/${productId}/${supplierId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error("Failed to delete supplier");
  return res.json();
};

export {
  getAllSuppliers,
  addSupplier,
  getSupplier,
  updateSupplier,
  deleteSupplier
};