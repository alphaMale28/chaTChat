import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatPreviewContainer from "./ChatPreviewContainer";

function ChatContainer() {
  return (
    <>
      <ChatHeader />
      <ChatPreviewContainer />
      <MessageInput />
    </>
  );
}

export default ChatContainer;
