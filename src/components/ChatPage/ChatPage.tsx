import { useAppSelector } from "@/lib/hooks";
import { SecondarySidebar } from "../layout/SecondarySidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../ui/resizable";
import ChatWindow from "./ChatWindow";

const ChatPage = () => {
    const { activeView } = useAppSelector(state => state.ui);


    return (
        <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={15} minSize={15} maxSize={40}>
                <SecondarySidebar activeView={activeView} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
                <ChatWindow />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

export default ChatPage;