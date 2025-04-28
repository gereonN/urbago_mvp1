import React, { useState } from 'react';
import styles from './ChatInterface.module.css';
import { PlantData } from '@/types/plant';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  plantId?: string;
  plantName?: string;
  question?: string;
  bedPlanningData?: any;
  onClose?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  plantId, 
  plantName, 
  question,
  bedPlanningData,
  onClose 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Call API when component mounts if we have initial query data
  React.useEffect(() => {
    if ((plantId && question) || bedPlanningData) {
      handleInitialQuery();
    }
  }, [plantId, question, bedPlanningData]);

  const handleInitialQuery = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let queryType = '';
      let requestBody = {};

      if (plantId && question) {
        // Plant-specific question
        queryType = 'plantInfo';
        requestBody = {
          queryType,
          plantId,
          question
        };
        
        // Add initial user message
        setMessages([{
          role: 'user',
          content: `Frage zu ${plantName || 'Pflanze'}: ${question}`
        }]);
      } 
      else if (bedPlanningData) {
        // Bed planning request
        queryType = 'bedPlanning';
        requestBody = {
          queryType,
          ...bedPlanningData
        };
        
        // Add initial user message for bed planning
        setMessages([{
          role: 'user',
          content: `Bitte erstelle einen Bepflanzungsplan für mein Beet (${bedPlanningData.bedDimensions.length}m × ${bedPlanningData.bedDimensions.width}m).`
        }]);
      }
      else {
        setError('Keine gültige Anfrage gefunden.');
        setIsLoading(false);
        return;
      }

      // Call the API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Add assistant response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response
      }]);
    } catch (err: any) {
      console.error('Error calling chat API:', err);
      setError(`Fehler beim Abrufen der Antwort: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>Urbago Garten-Assistent</h3>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        )}
      </div>

      <div className={styles.messagesContainer}>
        {messages.length === 0 && !isLoading && !error && (
          <div className={styles.emptyState}>
            <p>Deine Anfrage wird verarbeitet...</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
          >
            <div className={styles.messageContent} dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br>') }} />
          </div>
        ))}

        {isLoading && (
          <div className={styles.loadingIndicator}>
            <p>Urbago denkt nach...</p>
            <div className={styles.spinner}></div>
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
            <button onClick={handleInitialQuery}>Erneut versuchen</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
