import React from 'react';
import { Message } from '../types';
import SourceBadge from './SourceBadge';
import FeedbackButtons from './FeedbackButtons';

interface MessageBubbleProps {
  message: Message;
  messageIndex: number;
  onFeedback: (
    messageId: string,
    messageIndex: number,
    feedback: 'positive' | 'negative'
  ) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  messageIndex,
  onFeedback,
}) => {
  const isUser = message.role === 'user';

  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => (
        <span key={i}>
          {line}
          {i < content.split('\n').length - 1 && <br />}
        </span>
      ));
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-optum-blue flex items-center justify-center text-white text-sm font-bold mr-2">
          HR
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-optum-orange text-white rounded-tr-sm'
              : 'bg-white text-gray-800 rounded-tl-sm shadow-sm border border-gray-100'
          }`}
        >
          <p className="text-sm leading-relaxed">
            {formatContent(message.content)}
          </p>
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-1 px-1">
            <SourceBadge sources={message.sources} />
          </div>
        )}

        {!isUser && (
          <div className="px-1">
            <FeedbackButtons
              messageId={message.id}
              messageIndex={messageIndex}
              feedback={message.feedback}
              onFeedback={onFeedback}
            />
          </div>
        )}

        <span className="text-xs text-gray-400 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-bold ml-2">
          You
        </div>
      )}
    </div>
  );
};

export default MessageBubble;