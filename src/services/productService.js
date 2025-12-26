const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getProducts = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();

    if (data.err) throw new Error(data.err);
    return data.products || [];
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

export {
  getProducts, addProduct
};