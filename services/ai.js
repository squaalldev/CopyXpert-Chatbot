class AIService {
  constructor() {
    this.MODEL_NAME = process.env.GEMINI_MODEL || "gemini-pro-vision";
    this.API_KEY = process.env.GEMINI_API_KEY;
    
    if (!this.API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
    }
  }

  async generateResponse(prompt, file = null) {
    try {
      // Detect language and set formatting instructions accordingly
      const language = this.detectLanguage(prompt);
      const formattingInstructions = this.getFormattingInstructions(language);
      
      const formattedPrompt = `
        ${prompt}

        ${formattingInstructions}
      `;

      let contents = [{
        parts: [{ 
          text: formattedPrompt 
        }]
      }];

      if (file) {
        const base64Data = await this.getBase64(file);
        const mimeType = file.type;

        contents[0].parts.push({
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${this.MODEL_NAME}:generateContent?key=${this.API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contents })
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      let text = data.candidates[0].content.parts[0].text;
      
      text = text
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^\- (.*$)/gm, '<li>$1</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');

      if (!text.startsWith('<')) {
        text = `<p>${text}</p>`;
      }

      return text;
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMsg = this.detectLanguage(prompt) === 'es' 
        ? "<p>Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.</p>"
        : "<p>Sorry, there was an error processing your message. Please try again.</p>";
      return errorMsg;
    }
  }

  detectLanguage(text) {
    // Simple language detection based on common Spanish words and characters
    const spanishPatterns = /[áéíóúñ¿¡]|(\b(el|la|los|las|de|en|que|por|con|para|este|esta|estos|estas|mi|tu|su|nos|les|un|una|unos|unas|ser|estar|hola|gracias|buenos|días|cómo|qué|cuál|dónde|quién|por qué)\b)/i;
    
    return spanishPatterns.test(text) ? 'es' : 'en';
  }

  getFormattingInstructions(language) {
    const instructions = {
      en: `
        Please format your response with:
        - Clear paragraphs separated by line breaks
        - Use "##" for main section headings
        - Use "###" for subsection headings
        - Use "-" for bullet points when listing items
        - Maintain clear structure and organization
        - Add line breaks between sections
        
        Respond in English.
      `,
      es: `
        Por favor formatea tu respuesta con:
        - Párrafos claros separados por saltos de línea
        - Usa "##" para títulos de secciones principales
        - Usa "###" para subtítulos
        - Usa "-" para viñetas al listar elementos
        - Mantén una estructura y organización clara
        - Agrega saltos de línea entre secciones
        
        Responde en español.
      `
    };

    return instructions[language];
  }

  async getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }
}

const aiService = new AIService();