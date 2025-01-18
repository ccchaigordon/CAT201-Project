import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext"; // Import the custom look
import AdminNavBar from "../admin/AdminNavBar";
// import SuccessMessageModal from "../admin/SuccessMessageModal";
import "../../style/LoginPage.css";
import SuccessMessageModal from "../admin/SuccessMessageModal";

const LoginPage = () => {
  //*
  const { setUserId } = useUser();
  //*

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  // const [rememberMe, setRememberMe] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    // setShowModal(true);
    // await handleLogIn();

    try {
      const response = await fetch(
        `http://localhost:8083/backend/user?category=login`, {
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
      const userID = user.userId;
      const userRole = user.role;
      setUserId(userID); //*
  
      // // const users = parseCSV(csvText);

      // const user = users.find((user: any) => user.email === email && user.password === password);

      console.log("User:", user);
      console.log("User ID:", userID);

      if (user.success) {
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

  // const handleLogIn = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8083/backend/user?category=login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           email,
  //           password,
  //         }),
  //       }
  //     ); // Replace with the actual path to your CSV file
  //     const user = await response.json();
  //     const userID = user.userId;
  //     const userRole = user.role;

  //     setUserId(userID); //*

  //     console.log("User:", user);
  //     console.log("User ID:", userID);

  //     if (user.success) {
  //       if (userRole === "admin") {
  //         navigate("/admin");
  //       } else if (userRole === "user") {
  //         navigate("/test");
  //       }
  //     } else {
  //       setErrorMessage("Invalid email or password");
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     setErrorMessage("An error occurred. Please try again.");
  //   }
  // };

  return (
    <>
      <AdminNavBar />
      <div className="login-page">
        <div className="login-header">
          <h1>Log In</h1>
        </div>
        <div className="login-container">
          <form
            onSubmit={handleSubmit}
            className="login-form"
          >
            <div className="form-field">
              <label>
                Email
                <span style={{ color: "red" }}> *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Password
                <span style={{ color: "red" }}> *</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </label>
            </div>
            <div className="form-field">
              <button type="submit" onClick={handleSubmit}>
                Login
              </button>
            </div>
            <div className="form-field">
              <button type="button" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
        {/* {showModal && (
          <SuccessMessageModal
            message="Login successful!"
            onClose={() => setShowModal(false)}
          />
        )} */}
      </div>
    </>
  );
};

export default LoginPage;
