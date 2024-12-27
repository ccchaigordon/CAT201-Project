import {useState} from "react";
import ContactInfoForm from "./ContactInfo";
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
    </div>
    );
}

export default CheckOutPage;