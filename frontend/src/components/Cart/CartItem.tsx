export interface CartItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  image,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="cart-item">
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>Price: RM{price}</p>
        <div>
          <button onClick={() => onUpdateQuantity(id, quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => onUpdateQuantity(id, quantity + 1)}>+</button>
        </div>
      </div>
      <button onClick={() => onRemove(id)}>Remove</button>
    </div>
  );
};

export default CartItem;
