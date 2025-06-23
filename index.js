import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });
    const data = await res.json();
    const botMsg = { role: 'bot', content: data.reply };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>hyuraaChatbot</title>
      </Head>
      <main className="flex flex-col h-screen bg-[#1e1e2f] text-white p-4">
        <h1 className="text-3xl font-bold mb-4">hyuraaChatbot</h1>
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'} max-w-xs`}>
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-gray-400 italic">Typing...</div>}
        </div>
        <div className="flex">
          <input
            className="flex-1 p-2 rounded-l-lg bg-gray-800 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Tulis pesan ke hyuraaChatbot..."
          />
          <button onClick={sendMessage} className="bg-blue-600 px-4 rounded-r-lg">Kirim</button>
        </div>
      </main>
    </>
  );
}
