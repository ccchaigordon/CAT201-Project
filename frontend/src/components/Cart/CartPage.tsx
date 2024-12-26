import React from "react";
import NavBar from "../global/NavBar";
import SearchBar from "../global/SearchBar";
import CartItem from "./CartItem";
import { CartItemProps } from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCartMessage from "./EmptyCartMessage";
import Footer from "../global/Footer";
import "../../style/Cart.css";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItemProps[]>([
    // Example items
    {
      id: "1",
      name: "Squier Helkit ST Pink",
      image: "/products/squier_helkit_st_pink.png",
      price: 2799.99,
      quantity: 1,
      onUpdateQuantity: (id: string, quantity: number) =>
        console.log(`Updated ${id} to quantity ${quantity}`),
      onRemove: (id: string) => console.log(`Removed item ${id}`),
    },
    {
      id: "2",
      name: "Squier Debut Prec Red",
      image: "/products/squier_debut_prec_red.png",
      price: 2399.99,
      quantity: 1,
      onUpdateQuantity: (id: string, quantity: number) =>
        console.log(`Updated ${id} to quantity ${quantity}`),
      onRemove: (id: string) => console.log(`Removed item ${id}`),
    },
  ]);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div>
      <NavBar />
      <div className="cart-page">
      <SearchBar />
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <CartSummary
              totalPrice={totalPrice}
              onCheckout={() => console.log("Checkout")}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
