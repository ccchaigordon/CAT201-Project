import { Link } from "react-router-dom";

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
                  <Link to="/">Guitars</Link>
                </li>
                <li>
                  <Link to="/">Basses</Link>
                </li>
                <li>
                  <Link to="/">Drums</Link>
                </li>
                <li>
                  <Link to="/">Keyboards</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Brands</h4>
              <ul>
                <li>
                  <Link to="/">Fender</Link>
                </li>
                <li>
                  <Link to="/">PRS</Link>
                </li>
                <li>
                  <Link to="/">Marshall</Link>
                </li>
                <li>
                  <Link to="/">NUX</Link>
                </li>
                <li>
                  <Link to="/">Focusrite</Link>
                </li>
                <li>
                  <Link
                    to="/"
                    style={{
                      color: "#FFFFFF",
                      textDecoration: "underline",
                      fontSize: "12px",
                    }}
                  >
                    See more
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>About</h4>
              <ul>
                <li>
                  <Link to="/">Terms of Use</Link>
                </li>
                <li>
                  <Link to="/">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/">Return & Exchange Policy</Link>
                </li>
                <li>
                  <Link to="/">Contact Us</Link>
                </li>
                <li>
                  <Link to="/">Warranty</Link>
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
