import { VirtualList } from 'react-window';
import Message from './Message';

function ChatMessages({ messages }) {
  return (
    <VirtualList
      height={window.innerHeight - 120}
      itemCount={messages.length}
      itemSize={100}
      width="100%"
    >
      {({ index, style }) => (
        <Message
          message={messages[index]}
          style={style}
        />
      )}
    </VirtualList>
  );
}

export default ChatMessages;
