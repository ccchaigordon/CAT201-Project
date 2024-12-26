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
                  <a href="/">Guitars</a>
                </li>
                <li>
                  <a href="/">Basses</a>
                </li>
                <li>
                  <a href="/">Drums</a>
                </li>
                <li>
                  <a href="/">Keyboards</a>
                </li>
                <li>
                  <a href="/">Accessories</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Brands</h4>
              <ul>
                <li>
                  <a href="/fender">Fender</a>
                </li>
                <li>
                  <a href="/prs">PRS</a>
                </li>
                <li>
                  <a href="/">Marshall</a>
                </li>
                <li>
                  <a href="/">NUX</a>
                </li>
                <li>
                  <a href="/">Focusrite</a>
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
                  <a href="/">Terms of Use</a>
                </li>
                <li>
                  <a href="/">Privacy Policy</a>
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
