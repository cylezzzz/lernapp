// pages/api/saveProgress.ts
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, data } = req.body;

    if (!email || !data) {
        return res.status(400).json({ error: 'E-Mail und Daten erforderlich.' });
    }

    try {
        const { error } = await supabase.from('progress').upsert({
            email,
            daten: data,
            updated_at: new Date().toISOString()
        });

        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Supabase error:', err);
        return res.status(500).json({ error: 'Fehler beim Speichern.' });
    }
}
