import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import "../../style/EnterId.css";
// import "../../style/AdminPage.css";

function EnterUserId() {
  const [userID, setUserID] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmitProductID = async () => {
    setUserID(userID);

    try {
      const response = await fetch(
        `http://localhost:8083/backend/getUserById?userID=${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const userData = data.user;

        if (!data.status) {
          setMessage("User details not found");
          navigate("/admin/enter-user-id");
        } else {
          setMessage("Product found");
          console.log(userData);
          navigate("/admin/edit-user", { state: { user: userData } });
        }
      } else {
        setMessage("Please Enter User ID.");
        console.error("Fetch error: ", response.statusText);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fetch error: ", error.message);
      } else {
        console.error("Fetch error: ", error);
      }
      setMessage(
        "Network Error: Unable to reach the server. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        display: "block",
        backgroundColor: "#FFFFFF",
        color: "#000000",
      }}
    >
      <AdminNavBar />
      <div
        className="admin-content"
        style={{ height: "50vh", alignContent: "center", alignItems: "center" }}
      >
        <h1>Enter User ID</h1>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="button"
            style={{
              width: "100px",
              padding: "8px",
              alignItems: "center",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleSubmitProductID()}
          >
            Submit
          </button>
        </div>

        {message && <p style={{ color: "red" }}>{message}</p>}
      </div>
    </div>
  );
}

export default EnterUserId;
