interface CartSummaryProps {
  totalPrice: number;
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalPrice,
  onCheckout,
}) => {
  const taxes = totalPrice * 0.1; // Example: 10% tax
  const finalPrice = totalPrice + taxes;

  return (
    <div className="cart-summary">
      <h3>Summary</h3>
      <p>Subtotal: RM{totalPrice.toFixed(2)}</p>
      <p>SST(10%): RM{taxes.toFixed(2)}</p>
      <p>Total: RM{finalPrice.toFixed(2)}</p>
      <a href="/checkout">
        <button onClick={onCheckout}>Checkout</button>
      </a>
    </div>
  );
};

export default CartSummary;
