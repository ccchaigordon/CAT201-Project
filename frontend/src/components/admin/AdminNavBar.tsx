function AdminNavBar() {
    return (
      <>
        <header>
          <div className="header-container">
            <div className="logo">
              <a href="/">
                <img src="/assets/logo.svg" alt="Logo" />
              </a>
            </div>
            <div>
            </div>
            <div className="cart-profile">
              <a href="/profile">
                <img src="/assets/profile.svg" alt="Add href profile" />
              </a>
            </div>
          </div>
        </header>
      </>
    );
  }
  
  export default AdminNavBar;
  