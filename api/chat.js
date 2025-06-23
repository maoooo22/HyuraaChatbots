// /api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { prompt } = req.body;
  const API_KEY = '91c83dc4-f31c-4998-88a9-56526d6c3ce4';
  const endpoint = 'https://api.deepseek.com/chat/completions';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // atau ganti dengan model lo
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const message = data.choices[0].message.content;
    res.status(200).json({ reply: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
