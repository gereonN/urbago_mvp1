import React, { useState } from 'react';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  suggestions?: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSendMessage,
  suggestions = [
    "Wie oft gieße ich Tomaten?",
    "Wann kann ich ernten?",
    "Welche Krankheiten sind häufig?"
  ]
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  return (
    <div className="chat-function">
      <div className="chat-suggestions">
        <h4 className="suggestions-heading">Vorschläge:</h4>
        <div className="suggestions-chips">
          {suggestions.map((suggestion, index) => (
            <button 
              key={index}
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      
      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="chat-input-container">
          <input 
            type="text" 
            placeholder="Stelle eine freie Frage..." 
            className="chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="chat-send-button">
            <span className="send-icon">➤</span>
          </button>
        </div>
        <p className="chat-hint">Du kannst hier jede Frage zu Gartenbau stellen</p>
      </form>
    </div>
  );
};

export default ChatInterface;
