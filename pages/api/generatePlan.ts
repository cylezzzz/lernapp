// pages/api/generatePlan.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Nur POST erlaubt' });
    }

    const { exams, maxTime } = req.body;

    const prompt = `Heute ist der ${new Date().toLocaleDateString('de-DE')}. Der Nutzer hat folgende Prüfungen:\n\n` +
        exams.map(e => `- ${e.subject} am ${e.date} (${e.difficulty || 'mittel'})`).join('\n') +
        `\n\nMax. Lernzeit pro Tag: ${maxTime} Stunden.\nErstelle für die nächsten Tage einen realistischen Lernplan mit konkreten Themen pro Fach.`;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });

        const result = completion.choices[0].message.content;
        return res.status(200).json({ plan: result });
    } catch (error) {
        console.error('GPT-Fehler:', error);
        return res.status(500).json({ message: 'GPT konnte keinen Lernplan erstellen.' });
    }
}
