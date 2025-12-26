// src/components/NavBar/NavBar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
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
}

export default NavBar;