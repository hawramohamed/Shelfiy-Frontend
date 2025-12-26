import { Routes, Route } from 'react-router'; // Import React Router

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import ProductList from './components/ProductList/ProductList';
import ProductForm from './components/ProductForm/ProductForm';
import SupplierList from './components/SupplierList/SupplierList';
import SupplierForm from './components/SupplierForm/SupplierForm';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {
          user ?
          <>
            <Route path="/" element={<Dashboard />} />

            {/* Products */}
            <Route path="/products" element={<ProductList userId={user._id} />} />
            <Route path="/products/new" element={<ProductForm userId={user._id} />} />
            <Route path="/products/:productId/edit" element={<ProductForm userId={user._id} />} />

            {/* Suppliers */}
            <Route path="/products/:productId/suppliers" element={<SupplierList userId={user._id} />} />
            <Route path="/products/:productId/suppliers/new" element={<SupplierForm userId={user._id} />} />
            <Route path="/products/:productId/suppliers/:supplierId/edit" element={<SupplierForm userId={user._id} />} />

            {/* Profile */}
            <Route path="/profile" element={<h1>{user.username}</h1>} />
          </>
            :
            <Route path='/' element={<Landing/>}/>
        }
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;

