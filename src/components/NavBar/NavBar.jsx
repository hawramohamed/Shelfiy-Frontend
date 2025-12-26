
import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';


import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

   const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
    Navigate('/');
  };

  return (
    <nav>
      {user ? (
        <ul>
          <li>Welcome, {user.username}</li>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><button onClick={handleSignOut}>Sign Out</button></li>
        </ul>
      ) : (
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sign-up">Sign Up</Link></li>
          <li><Link to="/sign-in">Sign In</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;

