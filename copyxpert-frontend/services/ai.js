class AIService {
  async generateResponse(prompt, file = null) {
    try {
      const payload = { prompt };
      if (file) {
        const fileData = await this.processFile(file);
        payload.file = fileData;
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
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
