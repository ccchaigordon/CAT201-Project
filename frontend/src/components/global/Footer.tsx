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
                  <a href="/brand/squier">Squier</a>
                </li>
                <li>
                  <a href="/brand/ibanez">Ibanez</a>
                </li>
                <li>
                  <a href="/brand/roland">Roland</a>
                </li>
                <li>
                  <a href="/brand/focusrite">Focusrite</a>
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
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
