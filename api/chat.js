export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const { prompt } = req.body;
  const API_KEY = '91c83dc4-f31c-4998-88a9-56526d6c3ce4'; // ganti dengan key lo sendiri
  const endpoint = 'https://api.deepseek.com/chat/completions';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat', // pastikan ini model yang valid
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ]
      }),
    });

    const data = await response.json();

    // DEBUG log kalo ada masalah
    if (!response.ok) {
      console.error('API Error:', data);
      return res.status(response.status).json({ error: data });
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      return res.status(500).json({ error: 'Gagal mendapatkan jawaban dari model.' });
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghubungi AI.' });
  }
}
