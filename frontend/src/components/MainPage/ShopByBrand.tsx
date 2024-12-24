function ShopByBrand() {
  return (
    <>
      <div className="brand-container">
        <h2>Shop by Brand</h2>
        <div className="brands-wrapper">
          <div className="brand">
            <a href="/fender" className="brand-link">
              <img src="/assets/fender.jpg" alt="Fender" />
            </a>
            <a href="/prs" className="brand-link">
              <img
                src="/assets/prs.png"
                alt="PRS"
                style={{ filter: "invert(100%)" }}
              />
            </a>
            <a href="/squier" className="brand-link">
              <img
                src="/assets/squier.png"
                alt="Squier"
                style={{ filter: "invert(100%)" }}
              />
            </a>
            <a href="/marshall" className="brand-link">
              <img src="/assets/marshall.png" alt="Marshall" />
            </a>
            <a href="/nux" className="brand-link">
              <img
                src="/assets/nux.jpg"
                alt="Nux"
                style={{ filter: "invert(100%)" }}
              />
            </a>
            <a href="/focusrite" className="brand-link">
              <img
                src="/assets/focusrite.png"
                alt="Focusrite"
                style={{ filter: "invert(100%)" }}
              />
            </a>
          </div>
        </div>
        <div className="see-more">
          <a href="#">See more</a>
        </div>
      </div>
    </>
  );
}

export default ShopByBrand;
