import {useState} from "react";
import ContactInfoForm from "./ContactInfo";
import PaymentMethodForm from "./Payment";
import "../../style/CheckOut.css";

function CheckOutPage(){
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        postcode: "",
        city: "",
        state: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

return(
    <div className = "checkout-page">
        <div className="logo">
            <a href="/">
                <img src="/assets/logo.svg" alt="Logo" />
            </a>
        </div>
        <div className="checkout-form-container">
            <ContactInfoForm 
            contactInfo={contactInfo} 
            setContactInfo={setContactInfo}/>
        </div>
        <div className="payment-form-container">
            <PaymentMethodForm 
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            cardDetails={cardDetails}
            setCardDetails={setCardDetails}
            />
        </ div>
    </div>
    );
}

export default CheckOutPage;