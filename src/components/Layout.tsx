import { Outlet, useLocation } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Suspense, useEffect } from "react"
import LoadingSpinner from "./LoadingSpinner"

export const Layout = () => {
    const location = useLocation();
    const path = location.pathname;

    useEffect (()=>{
        window.scrollTo(0,0);

    },[path])
    return (
        <main>
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
            </Suspense>
            <Footer />
        </main>
    )
}

