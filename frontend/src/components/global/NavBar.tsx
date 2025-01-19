import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/NavBar.css";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn") || "false")
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Synchronize the login state with localStorage
  useEffect(() => {
    console.log("Login state changed:", isLoggedIn);
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn") || "false"));
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      // If the user is logged in, log them out and navigate to the main page
      setIsLoggedIn(false);
      navigate("/");
    } else {
      // If the user is not logged in, navigate to the login page
      navigate("/profile/login");
    }
  };

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleViewProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile/user");
    } else {
      navigate("/profile/login");
    }
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="/">
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ width: "120px", margin: "0.25rem 0" }}
              />
            </a>
          </div>
          <nav className="navbar">
            <ul>
              <li>
                <a href="/new-arrivals">WHAT'S NEW</a>
              </li>
              <li>
                <a href="/deals">DEALS</a>
              </li>
              <li>
                <a href="/#brands">BRANDS</a>
              </li>
              <li>
                <a href="/#categories">CATEGORIES</a>
              </li>
              <li>
                <a href="/about-us">ABOUT US</a>
              </li>
            </ul>
          </nav>
          <div className="cart-profile">
            <a href="/cart">
              <img src="/assets/cart.svg" alt="Add href cart" />
            </a>
            <div className="profile-dropdown">
              <img
                src="/assets/profile.svg"
                alt="Profile"
                className="profile-icon"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              {isDropdownVisible && (
                <div
                  className="dropdown-menu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* View Profile Button */}
                  {isLoggedIn && (
                    <button onClick={handleViewProfileClick}>
                      View Profile
                    </button>
                  )}
                  <button onClick={handleProfileClick}>
                    {isLoggedIn ? "Log Out" : "Log In"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
