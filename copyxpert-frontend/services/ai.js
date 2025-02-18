class AIService {
  async generateResponse(prompt) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });
      
      if (!response.ok) {
        throw new Error('AI service error');
      }
      
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }
}
