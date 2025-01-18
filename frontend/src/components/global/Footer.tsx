function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col">
              <h4>Categories</h4>
              <ul>
                <li>
                  <a href="/category/guitars">Guitars</a>
                </li>
                <li>
                  <a href="/category/basses">Basses</a>
                </li>
                <li>
                  <a href="/category/drums">Drums</a>
                </li>
                <li>
                  <a href="/category/keyboards">Keyboards</a>
                </li>
                <li>
                  <a href="/category/accessories">Accessories</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Brands</h4>
              <ul>
                <li>
                  <a href="/brand/fender">Fender</a>
                </li>
                <li>
                  <a href="/brand/prs">PRS</a>
                </li>
                <li>
                  <a href="/brand/">Marshall</a>
                </li>
                <li>
                  <a href="/brand/">NUX</a>
                </li>
                <li>
                  <a href="/brand/">Focusrite</a>
                </li>
                <li>
                  <a
                    href="/"
                    style={{
                      color: "#FFFFFF",
                      textDecoration: "underline",
                      fontSize: "12px",
                    }}
                  >
                    See more
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>About</h4>
              <ul>
                <li>
                  <a href="/legal/terms-of-use">Terms of Use</a>
                </li>
                <li>
                  <a href="/legal/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/">Return & Exchange Policy</a>
                </li>
                <li>
                  <a href="/">Contact Us</a>
                </li>
                <li>
                  <a href="/">Warranty</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
