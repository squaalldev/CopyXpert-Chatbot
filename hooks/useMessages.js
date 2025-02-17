import { useState, useCallback } from 'react';

function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);
  
  return {
    messages,
    loading,
    addMessage
  };
}

export default useMessages;
