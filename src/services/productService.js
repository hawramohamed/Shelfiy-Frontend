const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getAllProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/`, {
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
    const res = await fetch(`${BASE_URL}/${userId}/new`, {
      method: 'POST',
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
    console.error("Error adding product:", err);
    throw err;
  }

};

const getProduct = async (userId, productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/${productId}`, {
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

const editProduct = async (userId, productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/${productId}/edit`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if (data.err) throw new Error(data.err);
    return data;
  } catch (err) {
    console.error("Error editing product:", err);
    throw err;
  }
};

const updateProduct = async (userId, productId, productData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/${productId}`, {
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
    const res = await fetch(`${BASE_URL}/${userId}/${productId}`, {
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
  getAllProducts, addProduct, getProduct, editProduct, updateProduct, deleteProduct
};