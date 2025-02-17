const aiService = {
  async generateResponse(prompt, file) {
    const response = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, file }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
};

export default aiService;