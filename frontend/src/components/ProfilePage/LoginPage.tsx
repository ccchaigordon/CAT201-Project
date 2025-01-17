import React from "react";
// import { useNavigate } from "react-router-dom";
import AdminNavBar from "../admin/AdminNavBar";
// import SuccessMessageModal from "../admin/SuccessMessageModal";
import "../../style/LoginPage.css";
import SuccessMessageModal from "../admin/SuccessMessageModal";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login logic here
    // For now, just show a success message
    setShowModal(true);
  };

  return (
    <>
    <AdminNavBar />
      <div className="login-page">
        <div className="login-header">
          <h1>Log In</h1>
        </div>
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </label>
            </div>
            <div className="form-field">
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </label>
            </div>
            <div className="form-field">
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
        {showModal && (
          <SuccessMessageModal
            message="Login successful!"
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default LoginPage;
