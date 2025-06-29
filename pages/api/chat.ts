import type { NextApiRequest, NextApiResponse } from 'next';

const dummyAnswers = [
  'Das ist eine Beispielantwort von Torben.',
  'Ich helfe dir gerne bei deinen Prüfungen!',
  'Lass uns gemeinsam den Lernplan erstellen.',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ message: 'Ungültiger Prompt' });
  }

  // Zufällige Dummy-Antwort wählen
  const answer = dummyAnswers[Math.floor(Math.random() * dummyAnswers.length)];

  return res.status(200).json({ message: answer });
}
