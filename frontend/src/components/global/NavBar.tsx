function NavBar() {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <a href="/">
              <img src="/assets/logo.svg" alt="Logo" />
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
            <a href="/profile/login">
              <img src="/assets/profile.svg" alt="Profile" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;
