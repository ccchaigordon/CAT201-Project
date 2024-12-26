const EmptyCartMessage: React.FC = () => (
  <div className="empty-cart">
    <img src="/assets/empty_cart.svg" alt="Empty Cart" />
    <h2>Your cart is currently empty!</h2>
    <p>You will find a lot of amazing products on our "Brands" page. <br />
      Browse our shops to add items to your cart!</p>
      <a href="/brands">
      <button>Browse Items</button> {/*ADD LINK TO PAGE*/}
      </a>
  </div>
);

export default EmptyCartMessage;
