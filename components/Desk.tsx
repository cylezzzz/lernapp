'use client';

import React from 'react';
import '../styles/Desk.css';

const Desk = () => {
  return (
    <div className="desk-container">
      <h1>Mein Schreibtisch</h1>
      <div className="exam-overview">
        <h2>Nächste Prüfungen:</h2>
        <ul>
          <li>Mathematik - 10. Juli</li>
          <li>Deutsch - 15. Juli</li>
          <li>Englisch - 17. Juli</li>
        </ul>
      </div>
      <button>Zum Kalender</button>
    </div>
  );
};

export default Desk;
