import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="/">
              <img src="./src/assets/logo.svg" alt="Logo" />
            </a>
          </div>
          <nav className="navbar">
            <ul>
              <li>
                <Link to="/new-arrivals">WHAT'S NEW</Link>
              </li>
              <li>
                <Link to="/deals">DEALS</Link>
              </li>
              <li>
                <Link to="/brands">BRANDS</Link>
              </li>
              <li>
                <Link to="/categories">CATEGORIES</Link>
              </li>
              <li>
                <Link to="/about-us">ABOUT US</Link>
              </li>
            </ul>
          </nav>
          <div className="cart-profile">
            <img src="./src/assets/cart.svg" alt="Add to cart" />
            <img src="./src/assets/profile.svg" alt="Profile" />
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
