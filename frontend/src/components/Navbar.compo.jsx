import {  useState } from "react";
import { Link, useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { FaRegCommentDots, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLogedIn } = useSelector((state) => state.user);

  const location = useLocation();
  const navigationType = useNavigationType();
  const showBackBtn = location.key !== 'default' && navigationType !== 'POP';
  const navigate = useNavigate();


  return (
    <div className="nav">
      {/* Left section: App logo */}
      <div className="nav-col-left">
        <h1 className="nav-head">Hey</h1>
        <FaRegCommentDots className="nav-icon" />
      </div>

      {/* Right section: Links and menu */}
      <div className="nav-col-right">
        {/* Desktop buttons */}
        <div className="off-nav-btns">
          {isLogedIn === true ? (
            <>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Link to="/settings" className="nav-link">Settings</Link>
              <Link to='/addUserPage' className="nav-link">add friends</Link>
              {
                showBackBtn && (
                  <Link
                  className="nav-link"
                   onClick={() => navigate(-1)}
                   >back</Link>            
                )
              }
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="ham-section" onClick={() => setMenuOpen(prev => !prev)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile dropdown menu */}
        <div className={menuOpen ? "ham-options" : "no-ham-option"}>
          {isLogedIn === true ? (
            <>
              <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>Profile</Link>
              <Link to="/settings" className="nav-link" onClick={() => setMenuOpen(false)}>Settings</Link>
                <Link to='/addUserPage' className="nav-link">add friends</Link>
              {
                showBackBtn && (
                  <Link 
                  className="nav-link"
                  onClick={() => navigate(-1)}>back</Link>            
                )
              }
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="nav-link" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
