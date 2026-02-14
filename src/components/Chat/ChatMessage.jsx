import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`message-wrapper ${isUser ? 'user-message' : 'ai-message'}`}>
      <div className="message-container">
        <div className="message-avatar">
          {isUser ? (
            <div className="avatar user-avatar">U</div>
          ) : (
            <div className="avatar ai-avatar">AI</div>
          )}
        </div>
        <div className="message-content">
          <div className="message-header">
            <span className="message-sender">
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <span className="message-time">{formatTime(message.timestamp)}</span>
          </div>
          <div className="message-text">{message.content}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
