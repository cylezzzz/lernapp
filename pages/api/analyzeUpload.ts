// pages/api/analyzeUpload.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import OpenAI from 'openai';

export const config = {
    api: {
        bodyParser: false
    }
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const form = new formidable.IncomingForm({ keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        try {
            const file = files.file?.[0] || files.file;
            if (!file) return res.status(400).json({ error: 'Keine Datei empfangen.' });

            const data = fs.readFileSync(file.filepath);
            const pdf = await pdfParse(data);

            const prompt = `Analysiere diesen Lernstoff und gib Themenvorschläge + Prüfungsvorbereitung:

${pdf.text.slice(0, 3000)}`;

            const chat = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [{ role: 'user', content: prompt }]
            });

            const result = chat.choices[0]?.message?.content || 'Keine Antwort erhalten.';
            res.status(200).json({ result });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Fehler bei der Analyse.' });
        }
    });
}
