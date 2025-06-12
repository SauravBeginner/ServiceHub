import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup, ConfirmationResult, signInWithPhoneNumber, UserCredential, User, onAuthStateChanged } from "firebase/auth";

declare global {
    interface Window {
        recaptchaVerifier: RecaptchaVerifier;
    }
}
interface FirebaseContextType {
    signInWithPhone: (number: string) => Promise<ConfirmationResult>;
    verifyOTP: (otp: string) => Promise<UserCredential>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);


export const useFirebase = () => {
    const context = useContext(FirebaseContext)
    if (!context) throw new Error("useFirebase must be used within FirebaseProvider");
    return context;
};

const firebaseConfig = {
    apiKey: "AIzaSyAYINPQeFN97zbw3oQ4FESvr3Rbpg0safc",
    authDomain: "service-hub-b137e.firebaseapp.com",
    projectId: "service-hub-b137e",
    storageBucket: "service-hub-b137e.firebasestorage.app",
    messagingSenderId: "900448277590",
    appId: "1:900448277590:web:0aa5440760d397ef5a57f7",
    measurementId: "G-TD62FJMR11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export const FirebaseProvider = ( {children }: { children: React.ReactNode }) => {
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

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setCurrentUser);
        return () => unsubscribe();
    }, [])

    const signinWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            throw err;
        }
    }

    return <FirebaseContext.Provider value={{ currentUser, signinWithGoogle }}>
        {children}
    </FirebaseContext.Provider>
}