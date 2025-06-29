# 📘 Lernapp – KI-gestütztes Lernsystem

Dieses Projekt ist ein intelligentes Lernsystem für Schüler:innen, Azubis und Erwachsene – zur gezielten Prüfungsvorbereitung mit Kalender, KI-Planung und Offline-Unterstützung.

## 🎯 Ziel

- Automatische Lernpläne (GPT-basiert)
- Tägliche Lernziele im Kalender
- Offline-Nutzung durch ZIP-Export
- Wiederholung & Feedback durch GPT

## 🚀 Hauptbereiche

| Route        | Funktion                          |
|--------------|-----------------------------------|
| `/setup`     | Klasse, Fach, Termine, Upload     |
| `/calendar`  | Farbiger Kalender mit Lernzielen  |
| `/dashboard` | Lernfortschritt, ZIP-Download     |
| `/results`   | Ergebnisse hochladen (optional)   |

## 🧱 Tech Stack

- **Next.js 14**
- **Tailwind CSS**
- **OpenAI GPT API**
- **Optional: LM Studio (lokal)**

## 🧪 Start lokal

```bash
git clone https://github.com/cylezzzz/lernapp.git
cd lernapp
npm install
npm run dev
