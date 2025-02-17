export function validateMessage(message) {
  if (!message.trim()) {
    throw new Error('Message cannot be empty');
  }
  if (message.length > 1000) {
    throw new Error('Message too long');
  }
  return message;
}
