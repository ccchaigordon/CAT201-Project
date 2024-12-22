function ShopByBrand() {
  return (
    <>
      <div className="brand-container">
        <h2>Shop by Brand</h2>
        <div className="brands-wrapper">
          <div className="brand">
            <img src="src/assets/fender.jpg" alt="Fender" />
            <img
              src="src/assets/prs.png"
              alt="PRS"
              style={{ filter: "invert(100%)" }}
            />
            <img
              src="src/assets/squier.png"
              alt="Squier"
              style={{ filter: "invert(100%)" }}
            />
            <img src="src/assets/marshall.png" alt="Marshall" />
            <img
              src="src/assets/nux.jpg"
              alt="Nux"
              style={{ filter: "invert(100%)" }}
            />
            <img
              src="src/assets/focusrite.png"
              alt="Focusrite"
              style={{ filter: "invert(100%)" }}
            />
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
