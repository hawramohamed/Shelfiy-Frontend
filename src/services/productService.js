const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const getProducts = async (userId) => {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  return data.products || [];
};

const addProduct = async (userId, productData) => {
  const res = await fetch(`${BASE_URL}/${userId}/new`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(productData)
  });
  return res.json();
};

export {
  getProducts, addProduct
};