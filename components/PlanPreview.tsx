'use client';

import React, { useState } from 'react';

const PlanPreview = () => {
    const [plan, setPlan] = useState([]);

    const handleGenerate = async () => {
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
        setPlan(data.plan);
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            <button onClick={handleGenerate}>Lernplan anzeigen</button>
            {plan.length > 0 && (
                <ul style={{ marginTop: '1rem' }}>
                    {plan.map((item, idx) => (
                        <li key={idx}>
                            <strong>{item.date} – {item.subject}</strong>: {item.topic}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlanPreview;
