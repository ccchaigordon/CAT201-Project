// function AdminNavBar() {
//     return (
//       <>
//         <header>
//           <div className="header-container">
//             <div className="logo">
//               <a href="/admin">
//                 <img src="/assets/logo.svg" alt="Logo" />
//               </a>
//             </div>
//             <div>
//             </div>
//             <div className="cart-profile">
//               <a href="/profile/login">
//                 <img src="/assets/profile.svg" alt="Add href profile" />
//               </a>
//             </div>
//           </div>
//         </header>
//       </>
//     );
//   }

//   export default AdminNavBar;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/NavBar.css";

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
      navigate("/profile/user");
      // navigate("/profile/user", { state : { user: userData }});
    } else {
      // Optionally, navigate to login page if not logged in
      navigate("/");
    }
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="/admin">
              <img src="/assets/logo.svg" alt="Logo" />
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
