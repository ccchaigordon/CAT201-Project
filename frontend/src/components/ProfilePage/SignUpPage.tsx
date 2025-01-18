import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    //const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");  // Email for signup
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();  // Navigate back to login page

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Send sign-up request to the backend
        try {
            const response = await fetch("http://localhost:8080/backend/user?category=signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, address, phoneNum })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setMessage("Sign-up successful!");
                } else {
                    setMessage("Sign-up failed: Invalid details");
                }
            } else {
                setMessage("Error: Unable to connect to server");
            }
        } catch (error) {
            setMessage("Error: Unable to connect to server");
        }
    };

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Phone Number:
                    <input
                        type="text"
                        value={phoneNum}
                        onChange={(e) => setPhoneNum(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default SignUpPage;
