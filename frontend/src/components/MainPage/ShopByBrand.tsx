function ShopByBrand() {
  return (
    <>
      <div className="brand-container">
        <h2>Shop by Brand</h2>
        <div className="brands-wrapper">
          <div className="brand">
            <a href="/brand/fender" className="brand-link">
              <img src="/assets/fender.jpg" alt="Fender" />
            </a>
            <a href="/brand/prs" className="brand-link">
              <img
                src="/assets/prs.png"
                alt="PRS"
                style={{ filter: "invert(100%)" }}
              />
            </a>
            <a href="/brand/squier" className="brand-link">
              <img
                src="/assets/squier.png"
                alt="Squier"
                style={{ filter: "invert(100%)" }}
              />
            </a>
            <a href="/brand/marshall" className="brand-link">
              <img src="/assets/marshall.png" alt="Marshall" />
            </a>
            <a href="/brand/nux" className="brand-link">
              <img
                src="/assets/nux.jpg"
                alt="Nux"
                style={{ filter: "invert(100%)" }}
              />
            </a>
            <a href="/brand/focusrite" className="brand-link">
              <img
                src="/assets/focusrite.png"
                alt="Focusrite"
                style={{ filter: "invert(100%)" }}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShopByBrand;
