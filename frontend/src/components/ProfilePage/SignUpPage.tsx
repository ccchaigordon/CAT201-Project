import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "../admin/AdminNavBar";

interface SignUpDetatils {
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNum: string;
  role: string;
}

function SignUpPage() {
  //const [userID, setUserID] = useState("");
  const [signUpDetails, setSignUpDetails] = useState<SignUpDetatils>({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNum: "",
    role: "user",
  });
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState(""); // Email for signup
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [phoneNum, setPhoneNum] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send sign-up request to the backend
    try {
      const response = await fetch(
        "http://localhost:8083/backend/user?category=signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: signUpDetails.name,
            email: signUpDetails.email,
            password: signUpDetails.password,
            address: signUpDetails.address,
            phoneNum: signUpDetails.phoneNum,
            role: signUpDetails.role,
          }),
        }
      );

      if (response.ok) {
        // const data = await response.json();
        // if (data.success) {
        //   setMessage("Sign-up successful!");
        // } else {
        //   setMessage("Sign-up failed: Invalid details");
        // }
        console.log("Sign Up Details:", signUpDetails);
        setMessage("Sign-up successful!");
        navigate("/profile/login");
      } else {
        setMessage("Failed to sign up");
      }
    } catch (error) {
      setMessage("Error: Unable to connect to server");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <>
      <AdminNavBar />
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSignUp}>
            <div className="form-field">
              <label>
                Name:
                <span style={{ color: "red" }}> *</span>
                <input
                  type="text"
                  name="name"
                  value={signUpDetails.name}
                  onChange={handleInputChange}
                  // className="form-field"
                  required
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Email:
                <span style={{ color: "red" }}> *</span>
                <input
                  type="email"
                  name="email"
                  value={signUpDetails.email}
                  onChange={handleInputChange}
                  // className="form-field"
                  required
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Password:
                <span style={{ color: "red" }}> *</span>
                <input
                  type="password"
                  name="password"
                  value={signUpDetails.password}
                  onChange={handleInputChange}
                  // className="form-field"
                  required
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Address:
                <span style={{ color: "red" }}> *</span>
                <input
                  type="text"
                  name="address"
                  value={signUpDetails.address}
                  onChange={handleInputChange}
                  // className="form-field"
                  required
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Phone Number:
                <span style={{ color: "red" }}> *</span>
                <input
                  type="text"
                  name="phoneNum"
                  value={signUpDetails.phoneNum}
                  onChange={handleInputChange}
                  // className="form-field"
                  required
                />
              </label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
