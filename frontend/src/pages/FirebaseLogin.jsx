// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "./firebase";
// import axios from "axios";

// const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//         const result = await signInWithPopup(auth, provider);
//         const token = await result.user.getIdToken();

//         // Send token to backend
//         const response = await axios.post("http://localhost:5000/api/auth/firebase-login", { token });
//         console.log(response.data); // User from MongoDB
//     } catch (error) {
//         console.error("Firebase login error:", error);
//     }
    
// };
