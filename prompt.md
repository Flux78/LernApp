# Projekt-Dokumentation: Multi-Subject Master (6r & 8g)

Dieses Dokument beschreibt die Architektur und die Konventionen der LernApp für die 6. Klasse Realschule (6r) und die 8. Klasse Gymnasium (8g) in Bayern.

## 1. Dateistruktur & Namenskonventionen

### Daten-Dateien (`subjects/`)
Um eine klare Trennung zwischen Fächern und Jahrgangsstufen zu gewährleisten, folgen alle Datendateien einer strikten Konvention:
- **Dateiname**: `[fach]_[stufe].js` (z.B. `english_6r.js`, `phys_8g.js`).
- **Variable**: Jede Datei definiert genau eine globale Konstante nach dem Muster `[fach][stufe]Data`.
  - Beispiel `math_6r.js` -> `const math6rData = { ... };`
  - Beispiel `phys_8g.js` -> `const phys8gData = { ... };`

### Kern-Dateien
- `index.html`: Beinhaltet das UI-Framework, CSS-Styles und die Importe aller Fach-Skripte.
- `app.js`: Enthält die gesamte Anwendungslogik, das State-Management und die Rendering-Engine.

## 2. Technische Konventionen

### Subject Registry
In `app.js` werden alle Fächer in der `subjectRegistry` registriert. Jedes Objekt enthält:
- `grade`: Die Klassenstufe ('6r' oder '8g').
- `data`: Dynamische Prüfung der geladenen Variable (`typeof english6rData !== 'undefined' ? english6rData : null`).
- `bg`: URL zum thematisch passenden Hintergrundbild.
- `abbr`: Ein zweistelliges Kürzel für die UI (z.B. 'PH' für Physik).

### Fehlerprüfung
Die App führt beim Start einen Integritäts-Check durch. Sollte ein Fach-Skript aufgrund von Syntaxfehlern oder fehlenden Dateien nicht geladen werden können, wird eine detaillierte Warnung in der Browser-Konsole ausgegeben.

## 3. Kern-Logik

### Smart Mode (Gewichtung)
Fragen werden nicht rein zufällig ausgewählt, sondern basierend auf der individuellen Erfolgsquote gewichtet:
- **Neu/Unbekannt**: Basis-Gewicht (10).
- **Schwach (< 50% richtig)**: Hohes Gewicht (20) -> erscheint doppelt so oft.
- **Meister (> 80% richtig)**: Niedriges Gewicht (2) -> erscheint selten.

### State Management
Der State wird pro Fach im `localStorage` unter `lernapp_[subjectKey]` gespeichert. Globale Einstellungen (DarkMode, Klassenstufe, zuletzt gewähltes Fach) werden separat persistiert, um Konsistenz beim Fachwechsel zu garantieren.

## 4. UI / UX Features

### Dynamisches Design
- **Hintergrundbilder**: Fachspezifische Hintergründe mit einer Deckkraft von **14%**.
- **Thematische Farben**: Das gesamte Farbschema (`--primary-color`) passt sich beim Wechsel des Fachs automatisch an.
- **Zahnrad-Menü**: Ein Dropdown im Header für Einstellungen (Smart Mode, Konfetti, Skip-Button). Das Icon rotiert um 90° bei Aktivierung.

### Lern-Hilfen
- **Hinweis-System**: 💡 Icons erscheinen nur bei vorhandenen Tipps. Sie fangen nach 10 Sekunden Inaktivität an zu wackeln (`wobble`). Der Text erscheint erst beim Hover.
- **Fortschritt**: Ein animierter Balken im Quiz-Header zeigt den Fortschritt der aktuellen Session (Ziel: 10 Fragen).

### Statistik & Achievements
- **Klassenstufen-Vergleich**: Die Statistik zeigt aggregierte Punkte und Quoten für 6r und 8g separat an.
- **Mastery-System**: Erreicht ein Nutzer in allen Fächern einer Stufe eine Quote von > 80% (bei mind. 10 Fragen), wird die Klassenstufe als "Gemeistert" markiert (Gold-Glow & Kronen-Icon).

## 5. Lehrplan-Inhalte (Bayern)

### Fächerübergreifend: Textaufgaben-Verstehen 🧠
Ein spezieller Modus, der in allen mathematisch-naturwissenschaftlichen Fächern integriert ist. Er trainiert die Lesekompetenz durch fünf spezialisierte Aufgaben-Typen:
- **Text Surgeon**: Unnötige Ablenkungen im Text identifizieren.
- **Question Hunter**: Die einzig mathematisch sinnvolle Fragestellung finden.
- **Info Jigsaw**: Die notwendigen Puzzleteile (Sätze) für die Lösung auswählen.
- **Units Detective**: Einheiten-Fehler finden oder korrekt umrechnen.
- **Question Clarity**: Komplexe Sätze in einfache mathematische Terme übersetzen.

### 6. Klasse Realschule (6r)
- **Fächer**: Englisch, Mathematik, Deutsch, Geschichte, Geographie, Minecraft.
- **Fokus**: Grundrechenarten, Bruchrechnung, Grammatik-Basics, Antike Welt, Textverständnis.

### 8. Klasse Gymnasium (8g)
- **Fächer**: Physik, Englisch, Mathematik, Biologie, Latein.
- **Fokus**: Mechanik/Energie, USA-Landeskunde, Lineare Funktionen, Zellbiologie, AcI/PC-Grammatik, komplexe Textanalyse.
