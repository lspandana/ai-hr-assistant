import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../types';
import { sendMessage, sendFeedback } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendChatMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessage(content, sessionId);

      if (!sessionId) {
        setSessionId(response.sessionId);
      }

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: response.message,
        timestamp: response.timestamp,
        sources: response.sources,
        feedback: null,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ||
        'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const submitFeedback = useCallback(async (
    messageId: string,
    messageIndex: number,
    feedback: 'positive' | 'negative'
  ) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );

    await sendFeedback({
      sessionId,
      messageIndex,
      feedback,
    });
  }, [sessionId]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId('');
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sessionId,
    sendChatMessage,
    submitFeedback,
    clearChat,
  };
};