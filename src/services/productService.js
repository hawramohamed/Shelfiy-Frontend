const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const getAllProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

const addProduct = async (userId, productData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/new`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ ...productData, suppliers: [] })
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
};

const getProduct = async (userId, productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
};

const updateProduct = async (userId, productId, productData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(productData)
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};

const deleteProduct = async (userId, productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/products/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return true;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};

export {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct
};