import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://your-render-server.onrender.com'); // ← RenderのURLに変更

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
      <h2>ライブコメント</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${i}`}
              alt="avatar"
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }}
            />
            <div style={{ background: '#e0f7fa', padding: '8px 12px', borderRadius: '16px' }}>{msg.content}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="コメントを入力"
          style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button
          onClick={sendText}
          style={{ padding: '8px 12px', background: '#4caf50', color: 'white', border: 'none', borderRadius: '8px' }}
        >
          🎮
        </button>
      </div>
    </div>
  );
}

export default App;
