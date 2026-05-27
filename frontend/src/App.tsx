import React from 'react';
import { useChat } from './hooks/useChat';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';

const App: React.FC = () => {
  const {
    messages,
    isLoading,
    error,
    sendChatMessage,
    submitFeedback,
    clearChat,
  } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-optum-blue text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-optum-orange rounded-lg flex items-center justify-center text-white font-bold text-lg">
            HR
          </div>
          <div>
            <h1 className="text-lg font-bold">HR Assistant</h1>
            <p className="text-xs text-blue-200">
              Powered by Gemini AI • Enterprise Knowledge Copilot
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-blue-200 hidden md:block">
            Session Active
          </span>
          <button
            onClick={clearChat}
            className="text-sm text-blue-200 hover:text-white transition-colors px-3 py-1 rounded-lg hover:bg-blue-700 border border-blue-400 hover:border-blue-300"
            aria-label="Clear chat history"
          >
            🗑 Clear Chat
          </button>
        </div>
      </header>

      {/* Responsible AI Notice */}
      <div className="bg-blue-50 border-b border-blue-100 px-6 py-2">
        <p className="text-xs text-blue-600 text-center">
          🤖 AI-generated responses are based on Optum HR policies.
          Always verify important decisions with HR at{' '}
          <span className="font-medium">hr@optum.com</span>
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <p className="text-sm text-red-600">{error}</p>
          </div>
          <p className="text-xs text-red-400">
            Please try again or contact hr@optum.com
          </p>
        </div>
      )}

      {/* Chat Window */}
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        onFeedback={submitFeedback}
      />

      {/* Input Bar */}
      <InputBar onSend={sendChatMessage} isLoading={isLoading} />

    </div>
  );
};

export default App;