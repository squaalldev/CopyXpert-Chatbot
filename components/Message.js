function Message({ message, reactions, onReaction, activeEmojiPicker, onToggleEmojiPicker }) {
  const messageClassName = `message ${message.isAI ? 'ai-message' : ''}`;
  
  return (
    <div key={message.id} className={messageClassName}>
      <img 
        className="message-avatar" 
        src={message.isAI ? '/Untitled design (21).png' : `https://images.websim.ai/avatar/${message.username}`}
        alt={message.username} 
      />
      <div className="message-content">
        <div className="message-header">
          <span className="message-author">{message.username}</span>
          <span className="message-time">
            {new Date(message.created_at).toLocaleTimeString()}
          </span>
        </div>
        {message.content && (
          <div 
            className="message-text"
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        )}
        {message.imageUrl && (
          <img 
            className="message-image" 
            src={message.imageUrl} 
            alt="Uploaded content"
            onClick={() => window.open(message.imageUrl, '_blank')}
          />
        )}
        <MessageReactions 
          messageId={message.id}
          reactions={reactions}
          onReaction={onReaction}
          activeEmojiPicker={activeEmojiPicker}
          onToggleEmojiPicker={onToggleEmojiPicker}
        />
      </div>
    </div>
  );
}