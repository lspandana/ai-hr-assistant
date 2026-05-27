import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onFeedback: (
    messageId: string,
    messageIndex: number,
    feedback: 'positive' | 'negative'
  ) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onFeedback,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-optum-blue rounded-full flex items-center justify-center text-white text-2xl mb-4">
            🏥
          </div>
          <h2 className="text-xl font-semibold text-optum-blue mb-2">
            Optum HR Assistant
          </h2>
          <p className="text-gray-500 text-sm max-w-sm">
            Ask me anything about Optum HR policies, leave management, onboarding, compliance, and more.
          </p>
        </div>
      )}

      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          messageIndex={index}
          onFeedback={onFeedback}
        />
      ))}

      {isLoading && (
        <div className="flex justify-start mb-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-optum-blue flex items-center justify-center text-white text-sm font-bold mr-2">
            HR
          </div>
          <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
            <div className="flex gap-1 items-center">
              <div className="w-2 h-2 bg-optum-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-optum-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-optum-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;