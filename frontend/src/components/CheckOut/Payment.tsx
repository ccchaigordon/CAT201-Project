import React from "react";

interface PaymentMethodFormProps {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  cardDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  setCardDetails: React.Dispatch<
    React.SetStateAction<{
      cardNumber: string;
      expiryDate: string;
      cvv: string;
    }>
  >;
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  paymentMethod,
  setPaymentMethod,
  cardDetails,
  setCardDetails,
}) => {
  /*const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };*/

  const handleCardDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="payment-method-form">
      <h3 className="payment-method-form-header">Select Payment Method</h3>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="">Select</option>
        <option value="creditCard">Credit Card</option>
        <option value="tng">Touch N Go</option>
        <option value="onlineBanking">Online Banking</option>
      </select>

      {paymentMethod === "creditCard" && (
        <div className="credit-card-details">
          <h4>Enter your card details.</h4>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailChange}
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={cardDetails.expiryDate}
            onChange={handleCardDetailChange}
          />
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handleCardDetailChange}
          />
        </div>
      )}
    </div>
  );

  /*return (
    <div>
      <h2>Payment Method</h2>
      <form>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={handlePaymentChange}
            />
            Credit/Debit Card
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentChange}
            />
            PayPal
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={handlePaymentChange}
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === "creditCard" && (
          <div className="card-details">
            <h3>Card Details</h3>
            <div>
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                placeholder="Enter your card number"
                required
              />
            </div>
            <div>
              <label>Expiry Date:</label>
              <input
                type="text"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                placeholder="MM/YY"
                required
              />
            </div>
            <div>
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                placeholder="CVV"
                required
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );*/
};

export default PaymentMethodForm;