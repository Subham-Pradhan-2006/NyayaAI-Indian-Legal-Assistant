import ChatInterface from "@/components/chat/ChatInterface";
import { Suspense } from "react";

export const metadata = {
  title: "Chat – NyayaAI",
  description: "Ask your Indian legal questions",
};

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading chat...</div>}>
      <ChatInterface />
    </Suspense>
  );
}
