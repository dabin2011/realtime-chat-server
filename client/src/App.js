import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://your-server-name.onrender.com'); // ← RenderのURLに変更

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    socket.on('chat', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('chat');
    };
  }, []);

  const sendText = () => {
    if (text.trim()) {
      socket.emit('chat', { type: 'text', content: text });
      setText('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h2>ライブコメント</h2>
      <div
        style={{
          height: '300px',
          overflowY: 'scroll',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem',
          background: '#fff',
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${i}`}
              alt="avatar"
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }}
            />
            <div
              style={{
                background: '#e0f7fa',
                padding: '8px 12px',
                borderRadius: '16px',
                maxWidth: '80%',
                wordBreak: 'break-word',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="コメントを入力"
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        <button
          onClick={sendText}
          style={{
            padding: '10px 16px',
            background: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
          }}
        >
          🎮
        </button>
      </div>
    </div>
  );
}

export default App;
