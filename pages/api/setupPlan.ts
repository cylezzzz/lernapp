import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { exams, maxTimePerDay } = req.body;

  const prompt = `
Heute ist der ${new Date().toLocaleDateString('de-DE')}.
Der Nutzer hat folgende Prüfungen:
${exams.map((e: any) => `- ${e.fach} am ${e.datum} (${e.level})`).join('\n')}

Maximale Lernzeit pro Tag: ${maxTimePerDay} Stunden.
Erstelle einen täglichen Lernplan mit 1–2 konkreten Themen pro Tag.
`;

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const plan = chat.choices[0]?.message?.content || '';
    res.status(200).json({ plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fehler beim Generieren des Lernplans.' });
  }
}