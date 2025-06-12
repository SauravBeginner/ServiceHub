import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup, User, onAuthStateChanged } from "firebase/auth";

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
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);


export const useFirebase = () => {
    const context = useContext(FirebaseContext)
    if (!context) throw new Error("useFirebase must be used within FirebaseProvider");
    return context;
};

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log(firebaseConfig);

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

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            throw err;
        }
    }

    return <FirebaseContext.Provider value={{ currentUser, signInWithGoogle }}>
        {children}
    </FirebaseContext.Provider>
}