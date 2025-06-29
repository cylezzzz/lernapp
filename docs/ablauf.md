
# 📅 Nutzer-Ablaufplan – KI-gestütztes Lernsystem

## 1. Setup-Phase (einmalig oder je Prüfung)
- Nutzer startet App (kein Login nötig)
- Wählt Klasse + Schule
- Wählt Fach + legt Prüfungstermin fest
- Lädt Lernstoff hoch (Foto, Screenshot, PDF)
- KI analysiert Stoffumfang
- GPT erstellt:
  - Lernplan (Tage + Inhalte)
  - Übungen + Links zu Erklärvideos

## 2. Zentrale Kalenderansicht
- Monatlich oder wöchentlich visualisiert
- Jeder Tag zeigt:
  - Lernziel(e)
  - Fachfarbe
  - Bei Klick: Material-Vorschau
- Farben je Fach wählbar

## 3. Offline-Modus (optional)
- Nutzer lädt ZIP herunter:
  - Kalenderübersicht als PDF
  - Lernblätter pro Tag
  - Erklärtexte & Links
- Lernbar ohne Internet

## 4. Wiederholung & Anpassung
- Bei erledigten Aufgaben:
  - Nutzer kann „Erledigt“ oder „Fehler“ markieren
  - Optional: Upload der Lösung (z. B. Multiple-Choice)
- GPT erkennt:
  - Was sicher sitzt → nach hinten
  - Was fehlt → wird automatisch neu eingeplant

## 5. Prüfungsvorbereitung
- 3 Tage vor Prüfung:
  - App generiert Mini-Probeprüfung
  - Nutzer bearbeitet → GPT wertet aus
- Relevante Lücken werden priorisiert wiederholt

## Übersicht der Schlüssel-Komponenten
| Komponente               | Funktion                        |
|--------------------------|---------------------------------|
| `CalendarView.tsx`       | Visualisiert Plan nach Tagen    |
| `MaterialPreview.tsx`    | Zeigt Aufgaben, Videos etc.     |
| `setupPlan.ts`           | GPT erstellt Lernplan           |
| `buildMaterials.ts`      | GPT erzeugt Aufgaben            |
| `generateOfflinePackage` | ZIP mit Kalender + Lernstoff    |
| `evaluateResults.ts`     | KI-Auswertung nach Lernphase    |
