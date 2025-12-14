// Chatbot service for customer support via n8n
const CHAT_WEBHOOK_URL = 'https://n8n.arverse.site/webhook/costemersupport';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  question: string;
  conversationId: string;
  timestamp: number;
  sessionData?: {
    userAgent: string;
    language: string;
    timestamp: string;
  };
}

export interface ChatResponse {
  answer: string;
  conversationId?: string;
  timestamp?: number;
  success: boolean;
}

/**
 * Send customer question to n8n chatbot webhook
 * @param question - Customer's question
 * @param conversationId - Unique conversation identifier
 * @returns Promise<ChatResponse> - Bot's response
 */
export const sendChatMessage = async (
  question: string,
  conversationId: string
): Promise<ChatResponse> => {
  try {
    console.log('Sending chat message:', { question, conversationId });

    const requestData: ChatRequest = {
      question,
      conversationId,
      timestamp: Date.now(),
      sessionData: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timestamp: new Date().toISOString(),
      },
    };

    const response = await fetch(CHAT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Chat request failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Chat response received:', result);

    return {
      answer: result.answer || result.response || result.message || "I'm here to help! Could you please rephrase your question?",
      conversationId: result.conversationId || conversationId,
      timestamp: result.timestamp || Date.now(),
      success: true,
    };
  } catch (error) {
    console.error('Failed to send chat message:', error);
    
    // Return a fallback response
    return {
      answer: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
      success: false,
    };
  }
};

/**
 * Generate a unique conversation ID
 */
export const generateConversationId = (): string => {
  return `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Save chat history to localStorage
 */
export const saveChatHistory = (messages: ChatMessage[]): void => {
  try {
    localStorage.setItem('shopsphere-chat-history', JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
};

/**
 * Load chat history from localStorage
 */
export const loadChatHistory = (): ChatMessage[] => {
  try {
    const saved = localStorage.getItem('shopsphere-chat-history');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
};

/**
 * Clear chat history
 */
export const clearChatHistory = (): void => {
  try {
    localStorage.removeItem('shopsphere-chat-history');
  } catch (error) {
    console.error('Failed to clear chat history:', error);
  }
};
