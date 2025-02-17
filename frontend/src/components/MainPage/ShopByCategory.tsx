function ShopByCategory() {
  return (
    <>
      <div className="shop-by-category">
        <h2>Shop by Category</h2>
        <div className="categories">
          <a href="/category/guitars" className="category">
            <img src="/assets/guitar.svg" alt="Guitars" />
            <span>Guitars</span>
          </a>
          <a href="/category/basses" className="category">
            <img src="/assets/bass.svg" alt="Basses" />
            <span>Basses</span>
          </a>
          <a href="/category/drums" className="category">
            <img src="/assets/drum.svg" alt="Drums" />
            <span>Drums</span>
          </a>

          <a href="/category/keyboards" className="category">
            <img src="/assets/keyboard.svg" alt="Keyboards" />
            <span>Keyboards</span>
          </a>
          <a href="/category/accessories" className="category">
            <img
              src="/assets/accessory.svg"
              alt="Accessories"
              style={{ filter: "invert(100%)" }}
            />
            <span>Accessories</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default ShopByCategory;
