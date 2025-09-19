import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "@/pages/NotFound";
import { LoginPage } from "@/components/auth/LoginPage";
import { ChatApp } from "@/components/ChatApp";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "axios";

const Router = () => {
    const { fetchUser } = useAuth()
    const [isServerOk, setIsServerOk] = useState(false);

    const serverTest = async () => {
        let i = 0;
        while (i < 5) {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_UPL}/test/ping`);

                if (data.success && data.message === 'pong') {
                    console.log('Server is up and running');
                    setIsServerOk(true);
                    return true; // ✅ Success
                } else {
                    console.error('Server responded, but not as expected:', data);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Server is not responding:', error.message);
                }
            }

            i++;
            await new Promise(resolve => setTimeout(resolve, 200)); // wait 1 second before retrying
        }

        console.error('Server did not respond correctly after 5 attempts');
        setIsServerOk(false);
        return false; // ❌ Failed after 5 attempts
    };


    useEffect(() => {
        if (isServerOk) return; // If server is already confirmed as OK, skip the test
        serverTest();
    }, [isServerOk]);

    useEffect(() => {
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