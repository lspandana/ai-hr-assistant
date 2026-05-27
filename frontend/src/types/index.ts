 export interface Message {
   id: string;
   role: 'user' | 'assistant';
   content: string;
   timestamp: string;
   sources?: Source[];
   feedback?: 'positive' | 'negative' | null;
 }

 export interface Source {
   id: string;
   title: string;
   category: string;
 }

 export interface ChatResponse {
   success: boolean;
   sessionId: string;
   message: string;
   sources: Source[];
   timestamp: string;
 }

 export interface FeedbackRequest {
   sessionId: string;
   messageIndex: number;
   feedback: 'positive' | 'negative';
 }