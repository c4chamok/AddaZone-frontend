import { CallInterface } from "@/components/call/CallInterface";
import ChatPage from "@/components/ChatPage/ChatPage";
import { FeedTab } from "@/components/feed/FeedTab";
import { MainLayout } from "@/components/layout/MainLayout";
import { NearbyTab } from "@/components/nearby/NearbyTab";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { SearchComponent } from "@/components/search/SearchComponent";
import useAxiosInstance from "@/hooks/axiosHooks";
import { useAppSelector } from "@/lib/hooks";
import SocketProvider from "@/lib/providers/SocketProvider";
import { setConversations, type conversation } from "@/lib/slices/chatSlice";
import { Settings } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const InternalRouting = () => {
    const { activeView } = useAppSelector(state => state.ui);
    const { axiosSecure } = useAxiosInstance();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const { data } = (await axiosSecure.get('/chat')) as { data: { conversations: conversation[] } };
                console.log(data);
                dispatch(setConversations(data.conversations));
            } catch (error) {
                console.error('Failed to fetch conversations:', error);
            }
        }
        fetchConversations();
    }, [dispatch, axiosSecure]);
    
    return (
        <SocketProvider>
            <MainLayout>
                {activeView == 'feed' && <FeedTab />}
                {activeView == 'nearby' && <NearbyTab />}
                {activeView == 'settings' && <Settings />}
                {activeView == 'profile' && <ProfilePage />}
                {activeView == 'call' && <CallInterface />}
                {activeView == 'search' && <SearchComponent />}
                {['friends', 'groups', 'channels'].includes(activeView) && <ChatPage />}
            </MainLayout>
        </SocketProvider>
    );
};

export default InternalRouting;