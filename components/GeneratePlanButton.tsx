'use client';

import React from 'react';

const GeneratePlanButton = () => {
    const handleClick = async () => {
        const response = await fetch('/api/generatePlan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                exams: [
                    { subject: 'Mathe', date: '2025-07-10' },
                    { subject: 'Deutsch', date: '2025-07-15' },
                ],
                maxTime: 2,
            }),
        });

        const data = await response.json();
        console.log('Lernplan:', data.plan);
        alert('Lernplan wurde generiert. Siehe Konsole!');
    };

    return <button onClick={handleClick}>Lernplan erzeugen</button>;
};

export default GeneratePlanButton;
