import { CallInterface } from "@/components/call/CallInterface";
import ChatPage from "@/components/ChatPage/ChatPage";
import { FeedTab } from "@/components/feed/FeedTab";
import { MainLayout } from "@/components/layout/MainLayout";
import { NearbyTab } from "@/components/nearby/NearbyTab";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { SearchComponent } from "@/components/search/SearchComponent";
import useAxiosInstance from "@/hooks/axiosHooks";
import { profilesMap } from "@/lib/cached";
import { useAppSelector } from "@/lib/hooks";
import SocketProvider from "@/lib/providers/SocketProvider";
import { setConversations, setSeenMessages, type conversation, type ISeenMessage } from "@/lib/slices/chatSlice";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const InternalRouting = () => {
    const { activeView } = useAppSelector(state => state.ui);
    const { axiosSecure } = useAxiosInstance();
    const [convosLoading, setConvosLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchConversations = async () => {
            setConvosLoading(true);
            try {
                const { data } = (await axiosSecure.get('/chat')) as 
                { data: { conversations: conversation[], messageSeen: ISeenMessage[] } };
                console.log(data);

                dispatch(setConversations(data.conversations));
                dispatch(setSeenMessages(data.messageSeen));

                data.conversations.forEach((convo) => {
                    convo.participants.forEach((p) => {
                        if (profilesMap.has(p.userId)) return;
                        profilesMap.set(p.userId, { id: p.userId, name: p.user.name, avator: p.user.avatar });
                    })                    
                })

            } catch (error) {
                setConvosLoading(false);
                console.error('Failed to fetch conversations:', error);
            } finally {
                setConvosLoading(false);
            }
        }
        fetchConversations();
    }, [dispatch, axiosSecure]);

    if (convosLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        )
    }

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