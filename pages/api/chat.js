export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  // Dummy response
  const response = {
    reply: `Hyuraa di sini! Kamu barusan bilang: "${message}"`
  };

  res.status(200).json(response);
}
