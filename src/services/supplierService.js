const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/product`;

const getAllSuppliers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error fetching suppliers:", err);
    throw err;
  }
};


const addSupplier = async (userId, productId, supplierData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}/suppliers`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(supplierData)
    });
    const data = await res.json();

    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error adding supplier:", err);
    throw err;
  }

};

const getSupplier = async (userId, productId, supplierId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}/${supplierId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error fetching supplier:", err);
    throw err;
  }
};

const editSupplier = async (userId, productId, supplierId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}/${supplierId}/edit`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error editing supplier:", err);
    throw err;
  }
};

const updateSupplier = async (userId, productId, supplierId, supplierData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}/${supplierId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(supplierData)
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error updating supplier:", err);
    throw err;
  }
};

const deleteSupplier = async (userId, productId, supplierId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}/${supplierId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error deleting supplier:", err);
    throw err;
  }
};


export {
  getAllSuppliers, addSupplier, getSupplier, editSupplier, updateSupplier, deleteSupplier
};