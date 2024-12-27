import React, { useState } from "react";

interface ContactInfoFormProps {
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
    city: string;
    state: string;
  };
setContactInfo: React.Dispatch<
    React.SetStateAction<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postcode: string;
    city: string;
    state: string;
    }>
  >;
}

interface Errors {
    phone: string;
    postcode: string;
}

//Malaysia states
const statesInMalaysia = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Malacca",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Kuala Lumpur",
    "Putrajaya",
    "Labuan",
  ];

/*const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ contactInfo, setContactInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
};*/

  const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ contactInfo, setContactInfo }) => {
    const [errors, setErrors] = useState<Errors>({ phone: "", postcode: "" });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "phone" || name === "postcode") {
        setErrors({ ...errors, [name]: "" });
      }
  
      setContactInfo({ ...contactInfo, [name]: value });
    };

    const validatePhone = () => {
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(contactInfo.phone)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone: "Please enter a valid phone number.",
          }));
        }
      };
    
      const validatePostcode = () => {
        const postcodeRegex = /^[0-9]{5}$/;
        if (!postcodeRegex.test(contactInfo.postcode)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            postcode: "Please enter a valid postcode.",
          }));
        }
      };

return (
<div className="contact-info-form">
    <h2 className="contact-info-header">Contact Information</h2>
    <form className="contact-info-fields">
    <div className="contact-info-input">
        <input
        type="email"
        name="email"
        value={contactInfo.email}
        onChange={handleChange}
        placeholder="Email"
        required
        />
    </div>
    
    <div className="contact-info-input">
        <input
        type="tel"
        name="phone"
        value={contactInfo.phone}
        onChange={handleChange}
        onBlur={validatePhone}
        placeholder="Phone"
        required
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
    </div>
    <div className="contact-info-row">
    <div className="contact-info-input half-width">
        <input
        type="text"
        name="firstName"
        value={contactInfo.firstName}
        onChange={handleChange}
        placeholder="First name"
        required
        />
    </div>
    <div className="contact-info-input half-width">
        <input
        type="text"
        name="lastName"
        value={contactInfo.lastName}
        onChange={handleChange}
        placeholder="Last name"
        required
        />
    </div>
    </div>
    <div className="contact-info-input">
        <input
        type="text"
        name="address"
        value={contactInfo.address}
        onChange={handleChange}
        placeholder="Address"
        required
        />
    </div>
    <div className="contact-info-row">
    <div className="contact-info-input third-width">
        <input
        type="text"
        name="postcode"
        value={contactInfo.postcode}
        onChange={handleChange}
        onBlur={validatePostcode}
        placeholder="Postcode"
        required
        />
        {errors.postcode && <p className="error-message">{errors.postcode}</p>}
    </div>
    <div className="contact-info-input third-width">
        <input
        type="text"
        name="city"
        value={contactInfo.city}
        onChange={handleChange}
        placeholder="City"
        required
        />
    </div>
    <div className="contact-info-input third-width">
        <select
        name="state"
        value={contactInfo.state}
        onChange={handleChange}
        required
        >
        <option value="" disabled>
            State
        </option>
        {statesInMalaysia.map((state) => (
            <option key={state} value={state}>
            {state}
            </option>
        ))}
        </select>
    </div>
    </div>
    </form>
</div>
);
};

export default ContactInfoForm;
