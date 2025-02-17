function ChatInput({ 
  newMessage, 
  onMessageChange, 
  onSubmit,
  onFileSelect,
  uploadingImage,
  selectedImagePreview,
  selectedImage, 
  onRemoveImage,
  fileInputRef,
  isAITyping
}) {
  // Detect language for placeholder text
  const isSpanish = aiService.detectLanguage(newMessage);
  const placeholder = isSpanish ? "Envía un mensaje" : "Send a message";
  
  return (
    <>
      <form className="chat-input" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={onFileSelect}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button 
          type="button" 
          className="upload-button"
          onClick={() => fileInputRef.current.click()}
          title={isSpanish ? "Subir imagen o PDF" : "Upload image or PDF"}
        >
          <i className="ri-attachment-line"></i>
        </button>
        <button type="submit" className="upload-button">
          {uploadingImage ? (
            <div className="loading-indicator"></div>
          ) : (
            <i className="ri-send-plane-fill"></i>
          )}
        </button>
      </form>
      {selectedImagePreview && (
        <div className="image-upload-preview">
          {selectedImagePreview.startsWith('data:image') ? (
            <img src={selectedImagePreview} alt={isSpanish ? "Vista previa" : "Upload preview"} />
          ) : (
            <i className="ri-file-pdf-line" style={{ fontSize: '2em' }}></i>
          )}
          <span>{selectedImage?.name}</span>
          <span className="remove-image" onClick={onRemoveImage}>
            <i className="ri-close-line"></i>
          </span>
        </div>
      )}
    </>
  );
}