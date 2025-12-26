const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getSuppliers = async (userId, productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}/suppliers`, {
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

export {
  getSuppliers, addSupplier
};