// // import { useState } from "react";

// // function LoginForm() {
// //     const [userID, setUserID] = useState("");
// //     const [password, setPassword] = useState("");
// //     const [message, setMessage] = useState("");

// //     const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
// //         e.preventDefault();

// //         // Send login request to the backend
// //         try {
// //             const response = await fetch("http://localhost:8080/backend/user?category=login", {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json"
// //                 },
// //                 body: JSON.stringify({ userID, password })
// //             });

// //             if (response.ok) {
// //                 const data = await response.json();
// //                 console.log(data); 
// //                 if (data.success) {
// //                   setMessage("Login successful!");  // Show success message
// //                 } else {
// //                   setMessage("Invalid credentials");  // Show error message
// //               }
// //             } else {
// //                   setMessage('Error');
// //             }
// //         } catch (error) {
// //             setMessage("Error: Unable to connect to server");
// //         }
// //     };

// //     return (
// //         <div>
// //             <form onSubmit={handleLogin}>
// //                 <label>
// //                     User ID:
// //                     <input
// //                         type="text"
// //                         value={userID}
// //                         onChange={(e) => setUserID(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 <br />
// //                 <label>
// //                     Password:
// //                     <input
// //                         type="password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                 </label>
// //                 <br />
// //                 <button type="submit">Login</button>
// //             </form>
// //             <p>{message}</p>
// //         </div>
// //     );
// // }

// // export default LoginForm;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LoginPage() {
//     const [userID, setUserID] = useState("");
//     const [password, setPassword] = useState("");
//     const [message, setMessage] = useState("");
//     const navigate = useNavigate();  // To navigate to the sign-up page

//     const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         // Send login request to the backend
//         try {
//             const response = await fetch("http://localhost:8080/backend/user?category=login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ userID, password })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.success) {
//                     setMessage("Login successful!");
//                 } else {
//                     setMessage("Invalid credentials");
//                 }
//             } else {
//                 setMessage("Error: Unable to connect to server");
//             }
//         } catch (error) {
//             setMessage("Error: Unable to connect to server");
//         }
//     };

//     const goToSignUp = () => {
//         navigate("/signup");  // Navigate to sign-up page
//     };

//     return (
//         <div>
//             <form onSubmit={handleLogin}>
//                 <label>
//                     User ID:
//                     <input
//                         type="text"
//                         value={userID}
//                         onChange={(e) => setUserID(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Password:
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <br />
//                 <button type="submit">Login</button>
//             </form>
//             <br />
//             <button onClick={goToSignUp}>Sign Up</button> {/* Sign-up button */}
//             <p>{message}</p>
//         </div>
//     );
// }

// export default Profile;


