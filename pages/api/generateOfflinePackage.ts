// pages/api/generateOfflinePackage.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import JSZip from 'jszip';
import fs from 'fs';

const generateOfflinePackage = async (req: NextApiRequest, res: NextApiResponse) => {
    const { studyPlan, materials } = req.body;

    const zip = new JSZip();

    // Hier fügst du PDFs und andere Dateien hinzu
    zip.file('lernplan.pdf', studyPlan);
    materials.forEach((material, index) => {
        zip.file(`material_${index + 1}.pdf`, material);
    });

    // Zip erstellen und dem Benutzer zum Download anbieten
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const filePath = '/tmp/lernpaket.zip';

    fs.writeFileSync(filePath, zipBuffer);
    res.download(filePath, 'lernpaket.zip', () => {
        fs.unlinkSync(filePath); // Datei nach dem Download löschen
    });
};

export default generateOfflinePackage;
