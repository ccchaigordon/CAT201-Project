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
                <a href="/new-arrivals">WHAT'S NEW</a>
              </li>
              <li>
                <a href="/deals">DEALS</a>
              </li>
              <li>
                <a href="/brands">BRANDS</a>
              </li>
              <li>
                <a href="/categories">CATEGORIES</a>
              </li>
              <li>
                <a href="/about-us">ABOUT US</a>
              </li>
            </ul>
          </nav>
          <div className="cart-profile">
            <img src="./src/assets/cart.svg" alt="Add href cart" />
            <img src="./src/assets/profile.svg" alt="Profile" />
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
