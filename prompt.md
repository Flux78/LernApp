# Projekt-Dokumentation: Multi-Subject Master (6r, 8g & AW)

Dieses Dokument beschreibt die Architektur und die Konventionen der LernApp für die 6. Klasse Realschule (6r), die 8. Klasse Gymnasium (8g) in Bayern sowie den Bereich Allgemeinwissen (AW).

## 1. Dateistruktur & Namenskonventionen

### Daten-Dateien (`subjects/`)
Um eine klare Trennung zwischen Fächern und Jahrgangsstufen zu gewährleisten, folgen alle Datendateien einer strikten Konvention:
- **Ordnerstruktur**: Jedes Fach hat einen eigenen Ordner in `subjects/` (z.B. `english_6r/`).
- **Metadaten (`index.js`)**: Beinhaltet Namen, Kategorien (Icon, Farbe, Desc) und `questionCounts` (Anzahl Fragen pro Kategorie).
- **Kategorien (`[kategorie].js`)**: Jede Kategorie ist eine eigene Datei, die ein Array von Fragen-Objekten exportiert.
- **Namespace**: Daten werden für den dynamischen Loader an das globale `window`-Objekt gebunden:
  - `index.js` -> `window.__subjectData_[path]_index`
  - `category.js` -> `window.__subjectData_[path]_[category]`

### Kern-Dateien
- `index.html`: Beinhaltet das UI-Framework, CSS-Styles und die Importe aller Fach-Skripte.
- `app.js`: Enthält die gesamte Anwendungslogik, das State-Management und die Rendering-Engine.

### Frage-Objekt-Struktur
`{ question, answers, correct (index), hint, mode (optional), stats: { correct, total } }`

## 2. Technische Konventionen

### Subject Registry
In `app.js` werden alle Fächer in der `subjectRegistry` registriert. Jedes Objekt enthält:
- `grade`: Die Klassenstufe ('6r', '8g' oder 'aw').
- `data`: Dynamische Prüfung der geladenen Variable (`typeof english6rData !== 'undefined' ? english6rData : null`).
- `bg`: URL zum Hintergrundbild von Unsplash.
- `abbr`: Ein zweistelliges Kürzel für die UI (z.B. 'PH' für Physik).
- `questionsCache`: Ein Objekt, das die Fragen der geladenen Kategorien speichert.

### Dynamischer Loader
Die App nutzt `loadScript(src)` (Promise-basiert), um Fach-Metadaten und Fragen erst bei Bedarf (Lazy Loading) in den DOM/Speicher zu laden.

## 3. Kern-Logik

### Smart Mode (Gewichtung)
Fragen werden nicht rein zufällig ausgewählt, sondern basierend auf der individuellen Erfolgsquote gewichtet:
- **Neu/Unbekannt**: Basis-Gewicht (10).
- **Schwach (< 50% richtig)**: Hohes Gewicht (20) -> erscheint doppelt so oft.
- **Meister (> 80% richtig)**: Niedriges Gewicht (2) -> erscheint selten.

### State Management
Der State wird pro Fach im `localStorage` unter `lernapp_[subjectKey]` gespeichert. 
Statistiken müssen beim Speichern (`saveState`) via `syncStatsFromData` aus dem `questionsCache` in den `state` extrahiert werden, um die individuellen Erfolgsquoten pro Frage zu erhalten.

### Minecraft-Belohnungs-System (6r)
- **Freischaltung**: Wird aktiv, sobald in einem beliebigen Schulfach mindestens 10 Fragen beantwortet wurden.
- **Ratio-Logik**: Die Anzahl der freischaltbaren Minecraft-Fragen berechnet sich dynamisch aus dem Verhältnis der insgesamt verfügbaren Fragen in Schulfächern zur Anzahl der Minecraft-Fragen.
- **Zufallsauswahl**: Verdiente Fragen werden zufällig aus dem Pool gewählt und permanent in `unlockedIndices` gespeichert. "Allgemeinwissen" ist von diesem Fortschritt ausgeschlossen (`excludeFromMinecraft: true`).

## 4. UI / UX Features

### Mobile Optimierung
Die App injiziert via `injectMobileStyles()` responsive CSS-Regeln:
- Antwort-Buttons sind für Daumen-Bedienung vergrößert (min-height 55px).
- Das `options-grid` wechselt auf dem Smartphone in ein einspaltiges Layout.
- Der `subject-selector` wird horizontal scrollbar mit `-webkit-overflow-scrolling: touch`.

### Dynamisches Design
- **Hintergrundbilder**: Fachspezifische Hintergründe mit einer Deckkraft von **14%**.
- **Thematische Farben**: Das gesamte Farbschema (`--primary-color`) passt sich beim Wechsel des Fachs automatisch an.
- **Zahnrad-Menü**: Ein Dropdown im Header für Einstellungen (Smart Mode, Konfetti, Skip-Button). Der Statistik-Tab wird im Bereich "Allgemeinwissen" automatisch ausgeblendet.

### Lern-Hilfen
- **Hinweis-System**: 💡 Icons erscheinen nur bei vorhandenen Tipps. Sie fangen nach 10 Sekunden Inaktivität an zu wackeln (`wobble`). Der Text erscheint erst beim Hover.
- **Fortschritt**: Ein animierter Balken im Quiz-Header zeigt den Fortschritt der aktuellen Session (Ziel: 10 Fragen).

### Statistik & Achievements
- **Klassenstufen-Vergleich**: Die Statistik zeigt aggregierte Punkte und Quoten für 6r und 8g separat an.
- **Mastery-System**: Erreicht ein Nutzer in allen relevanten Fächern einer Stufe eine Quote von >= 80% (bei mindestens 10 beantworteten Fragen pro Fach), wird die Klassenstufe als "Gemeistert" markiert (Gold-Glow & Kronen-Icon). "Allgemeinwissen" ist hierbei als Bonus-Bereich (`excludeFromStats: true`) oft ausgenommen.

### Daten-Portabilität
- **Export**: Speichert den gesamten Fortschritt (globale Settings + alle Fächer aus dem LocalStorage) in einer `lernapp_progress.json`.
- **Import**: Überschreibt den lokalen Speicher mit den Daten einer importierten JSON-Datei und führt einen `location.reload()` durch.

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

### Allgemeinwissen (AW)
- **Kategorien**: Weltwissen, Natur & Umwelt, Kultur & Geschichte, Technik & Wissenschaft.
