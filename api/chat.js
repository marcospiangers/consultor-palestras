export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, system } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_KEY}`,
      'HTTP-Referer': 'https://consultor-palestras.vercel.app',
      'X-Title': 'Efeito Virgula'
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-001',
      messages: [{ role: 'system', content: system }, ...messages],
      max_tokens: 1024,
      temperature: 0.7
    })
  });

  const data = await response.json();
  if (!response.ok) return res.status(response.status).json({ error: data.error?.message || 'API error' });
  res.json({ content: data.choices?.[0]?.message?.content || '' });
}
