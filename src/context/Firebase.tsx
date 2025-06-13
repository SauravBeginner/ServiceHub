//@ts-ignore
import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  onAuthStateChanged,
  signOut,
  //@ts-ignore
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../utils/firebase";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}
interface FirebaseContextType {
  // signInWithPhone: (number: string) => Promise<ConfirmationResult>;
  // verifyOTP: (otp: string) => Promise<UserCredential>;
  currentUser: User | null; // Add currentUser here
  signInWithGoogle: any; // Add signInWithGoogle here
  logOut: any;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context)
    throw new Error("useFirebase must be used within FirebaseProvider");
  return context;
};

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // const setupRecaptcha = () => {
  //     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  //         size: 'invinsible',
  //         callback: () => { }
  //     })
  // }

  // const signInWithPhone = async (number: string) => {
  //     setupRecaptcha();
  //     const appVerifier = window.recaptchaVerifier;
  //     const result = await signInWithPhoneNumber(auth, number, appVerifier);
  //     console.log(result);
  //     setConfirmationResult(result);

  //     return result;
  // }
  // const verifyOTP = async (otp: string) => {
  //     if (!confirmationResult) throw new Error("No OTP request found");
  //     return await confirmationResult.confirm(otp);
  // };

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
    setLoading(false);
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // await signInWithRedirect(auth, googleProvider);
    } catch (err) {
      throw err;
    }
  };

  const logOut = async () => {
    signOut(auth);
    navigate("/login");
  };

  // useEffect(() => {
  //     getRedirectResult(auth)
  //       .then((result) => {
  //         if (result && result.user) {
  //           console.log("Redirect login success:", result.user);
  //           setCurrentUser(result.user);
  //           navigate('/'); // Navigate to home after successful redirect login
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Redirect login error:", error);
  //       });
  //   }, [navigate]);

  if (loading) {
    return <div className="text-center p-10">Loading...</div>; // Show loader while checking auth
  }
  return (
    <FirebaseContext.Provider value={{ currentUser, signInWithGoogle, logOut }}>
      {children}
    </FirebaseContext.Provider>
  );
};
