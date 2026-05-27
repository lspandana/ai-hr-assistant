import React from 'react';

interface FeedbackButtonsProps {
  messageId: string;
  messageIndex: number;
  feedback: 'positive' | 'negative' | null | undefined;
  onFeedback: (
    messageId: string,
    messageIndex: number,
    feedback: 'positive' | 'negative'
  ) => void;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  messageId,
  messageIndex,
  feedback,
  onFeedback,
}) => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <span className="text-xs text-gray-400">Was this helpful?</span>
      <button
        onClick={() => onFeedback(messageId, messageIndex, 'positive')}
        className={`p-1 rounded transition-all ${
          feedback === 'positive'
            ? 'text-green-600 bg-green-50'
            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
        }`}
        title="Helpful"
        aria-label="Mark as helpful"
      >
        👍
      </button>
      <button
        onClick={() => onFeedback(messageId, messageIndex, 'negative')}
        className={`p-1 rounded transition-all ${
          feedback === 'negative'
            ? 'text-red-600 bg-red-50'
            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
        }`}
        title="Not helpful"
        aria-label="Mark as not helpful"
      >
        👎
      </button>
      {feedback && (
        <span className="text-xs text-gray-400">
          {feedback === 'positive' ? 'Thanks for your feedback!' : 'Sorry to hear that!'}
        </span>
      )}
    </div>
  );
};

export default FeedbackButtons;