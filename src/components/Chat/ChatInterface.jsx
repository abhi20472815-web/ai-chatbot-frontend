import React, { useState, useEffect, useRef } from 'react';
import { chatAPI } from '../../services/api';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatSidebar from './ChatSidebar';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      const response = await chatAPI.getChatHistory();
      setSessions(response.data.data);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const loadChatSession = async (sessionId) => {
    try {
      const response = await chatAPI.getChatSession(sessionId);
      setMessages(response.data.data.messages);
      setCurrentSessionId(sessionId);
      setSidebarOpen(false);
    } catch (error) {
      console.error('Error loading chat session:', error);
    }
  };

  const handleSendMessage = async (messageContent) => {
    const userMessage = {
      role: 'user',
      content: messageContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage({
        message: messageContent,
        sessionId: currentSessionId,
      });

      const aiMessage = response.data.data.message;
      const newSessionId = response.data.data.sessionId;

      setMessages((prev) => [...prev, aiMessage]);

      if (!currentSessionId) {
        setCurrentSessionId(newSessionId);
      }

      await loadChatHistory();
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    setSidebarOpen(false);
  };

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      try {
        await chatAPI.deleteChatSession(sessionId);
        setSessions(sessions.filter((s) => s.sessionId !== sessionId));
        if (sessionId === currentSessionId) {
          handleNewChat();
        }
      } catch (error) {
        console.error('Error deleting session:', error);
      }
    }
  };

  return (
    <div className="chat-interface">
      <ChatSidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={loadChatSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="chat-main">
        <div className="chat-header">
          <button
            className="menu-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1 className="chat-title">AI Chatbot</h1>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div className="empty-icon">💬</div>
              <h2>How can I help you today?</h2>
              <p>Start a conversation by typing a message below</p>
              <div className="suggestions">
                <button
                  className="suggestion-chip"
                  onClick={() =>
                    handleSendMessage('Explain quantum computing in simple terms')
                  }
                >
                  Explain quantum computing
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() =>
                    handleSendMessage('Write a short poem about AI')
                  }
                >
                  Write a poem about AI
                </button>
                <button
                  className="suggestion-chip"
                  onClick={() =>
                    handleSendMessage('Help me plan a healthy meal')
                  }
                >
                  Plan a healthy meal
                </button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {loading && (
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
};

export default ChatInterface;
