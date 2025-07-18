import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "@/pages/NotFound";
import { LoginPage } from "@/components/auth/LoginPage";
import { ChatApp } from "@/components/ChatApp";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const Router = () => {
    const { fetchUser } = useAuth()

    useEffect (() => {
        fetchUser()
    }, [fetchUser])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<AuthProvider><ChatApp /></AuthProvider>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;