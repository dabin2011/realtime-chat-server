import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://your-render-server.onrender.com'); // ← サーバーURLに変更

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('chat', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendText = () => {
    if (text.trim()) {
      socket.emit('chat', { type: 'text', content: text });
      setText('');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>リアルタイムチャット</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg.content}</div>
        ))}
      </div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="コメントを入力" />
      <button onClick={sendText}>送信</button>
    </div>
  );
}

export default App;
