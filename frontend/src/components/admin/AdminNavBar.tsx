import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/NavBar.css";
// import logo from '../../../backend/src/main/resources/logo.svg';

function AdminNavBar() {
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
    // const data = await response.json();
    // const userData = data.user;
    // Navigate to the profile page if logged in
    if (isLoggedIn) {
      navigate("/profile/admin");
      // navigate("/profile/user", { state : { user: userData }});
    } else {
      navigate("/profile/login");
    }
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="/admin">
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ width: "120px", margin: "0.25rem 0" }}
              />
            </a>
          </div>
          <div></div>
          <div className="cart-profile">
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

export default AdminNavBar;
