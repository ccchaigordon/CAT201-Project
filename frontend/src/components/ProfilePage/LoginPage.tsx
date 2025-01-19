import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext"; // Import the custom look
// import AdminNavBar from "../admin/AdminNavBar";
import NavBar from "../global/NavBar";
// import SuccessMessageModal from "../admin/SuccessMessageModal";
import "../../style/LoginPage.css";

const LoginPage = () => {
  const { setUserId } = useUser();
  const { setName } = useUser();
  const { setemail } = useUser();
  const { setpassword } = useUser();
  const { setAddress } = useUser();
  const { setPhoneNum } = useUser();
  const { setRole } = useUser();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);

    try {
      const response = await fetch(
        `http://localhost:8083/backend/user?category=login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: email,
            password: password,
          }),
        }
      ); // Replace with the actual path to your CSV file

      const user = await response.json();
      const userID = user.user_Id;
      const userName = user.name;
      const userEmail = user.email;
      const userPassword = user.password;
      const userAddress = user.address;
      const userPhoneNum = user.phoneNum;
      const userRole = user.role;
      setUserId(userID); //*
      setName(userName);
      setemail(userEmail);
      setpassword(userPassword);
      setAddress(userAddress);
      setPhoneNum(userPhoneNum);
      setRole(userRole);

      console.log("User Name:", userName);
      console.log("User ID:", userID);

      if (user.success) {
        // Update the login state in localStorage
        localStorage.setItem("isLoggedIn", "true");

        if (userRole === "admin") {
          navigate("/admin");
        } else if (userRole === "user") {
          // navigate("/test");
          navigate("/");
        }
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSignUp = () => {
    // Navigate to the sign up page
    navigate("/profile/signup");
  };

  return (
    <>
      <NavBar />
      <div className="login-page">
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field" style={{ marginTop: "1rem" }}>
              <label>
                Email
                <span style={{ color: "red" }}> *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  style={{ marginTop: "1rem" }}
                />
              </label>
            </div>
            <div className="form-field" style={{ marginTop: "1rem" }}>
              <label>
                Password
                <span style={{ color: "red" }}> *</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  style={{ marginTop: "1rem" }}
                />
              </label>
            </div>
            <div className="form-field" style={{ marginTop: "1rem" }}>
              <button
                type="submit"
                onClick={handleSubmit}
                style={{ borderRadius: "0.5rem" }}
              >
                Login
              </button>
            </div>
            <div
              className="form-field"
              style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
            >
              <button
                type="button"
                onClick={handleSignUp}
                style={{
                  borderRadius: "0.5rem",
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  border: "1px solid #000000",
                }}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
