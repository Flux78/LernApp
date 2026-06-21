# Projekt-Dokumentation: LernApp (6r, 7r, 8g, 9g & AW) — 6.239 Fragen

Dieses Dokument beschreibt die Architektur und die Konventionen der LernApp für die 6./7. Klasse Realschule (6r/7r), die 8./9. Klasse Gymnasium (8g/9g) in Bayern sowie den Bereich Allgemeinwissen (AW).

## 1. Dateistruktur & Namenskonventionen

### Daten-Dateien (`subjects/`)
Alle Datendateien folgen einer strikten Konvention:
- **Ordnerstruktur**: Kurzform = Key = Path (z.B. `eng_6r/`, `math_7r/`, `phys_8g/`).
- **Metadaten (`index.js`)**: Beinhaltet Namen, Kategorien (Icon, Farbe, Desc) und `questionCounts`.
- **Kategorien (`[kategorie].js`)**: Jede Kategorie ist eine eigene Datei mit Fragen-Array.
- **Namespace**: `window.__subjectData_[key]_index` bzw. `window.__subjectData_[key]_[category]`.

### Kern-Dateien
- `index.html`: UI-Framework, CSS-Styles und Skript-Importe.
- `app.js`: Anwendungslogik, State-Management und Rendering-Engine.

### Frage-Objekt-Struktur
```
{ question, answers, correct (index), hint, mode (optional), stats: { correct, total } }
```

## 2. Technische Konventionen

### Subject Registry (app.js)
- `grade`: Klassenstufe ('6r', '7r', '8g', '9g', 'aw').
- `MC_KEY` (='minecraft') für Minecraft-Zugriff.
- `isRealschule()` prüft auf '6r'/'7r'.
- `migrateLegacyKeys()` für localStorage-Migration alter Keys.

### Dynamischer Loader
`loadScript(src)` (Promise-basiert) für Lazy Loading von Fach-Metadaten und Fragen.

## 3. Kern-Logik

### Smart Mode (dynamische Schwierigkeit)
- **Neu/unbeantwortet**: `difficulty 1.0` → Gewicht 6 (normal)
- **Nach richtiger Antwort**: `difficulty −0.5` (leichter)
- **Nach falscher Antwort**: `difficulty +0.5` (schwerer)
- **Gewichtung**: sehr leicht (≤0.0) → 1, leicht (≤0.5) → 3, mittel (≤1.0) → 6, schwer (≤1.5) → 10, sehr schwer (>1.5) → 15
- **Anti-Demotivation**: Nach einer schweren Frage (≥1.5) werden leichte 3× häufiger und schwere nur halb so oft gewichtet

### Minecraft-Belohnungs-System (alle Realschulstufen)
- Freischaltung nach 10 beantworteten Fragen in Schulfächern.
- Ratio-Logik basierend auf Gesamtfragen.
- `excludeFromMinecraft: true` auf AW verhindert Einfluss.

## 4. UI / UX Features

### Grade Selector
Buttons für: 6r (6. Klasse Realschule), 7r (7. Klasse Realschule), 8g (8. Klasse Gymnasium), 9g (9. Klasse Gymnasium), AW (Allgemeinbildung).

### Klassenstufen-Vergleich
Statistik zeigt aggregierte Punkte und Quoten für alle Stufen.

## 5. Lehrplan-Inhalte (Bayern)

### Textaufgaben-Verstehen 🧠
Spezialmodus in allen mathematisch-naturwissenschaftlichen Fächern: Text Surgeon, Question Hunter, Info Jigsaw, Units Detective, Question Clarity.

### 6. Klasse Realschule (6r) — 1.478 Fragen
Englisch (485), Mathematik (189), Deutsch (197), Geschichte (160), Geographie (266), Minecraft-Bonus (181)

### 7. Klasse Realschule (7r) — 1.519 Fragen
Englisch (215), Mathematik (249), Deutsch (186), Geschichte (203), Geographie (228), Physik (221), Biologie (217)

### 8. Klasse Gymnasium (8g) — 984 Fragen
Physik (123), Englisch (202), Mathematik (118), Biologie (240), Latein (301)

### 9. Klasse Gymnasium (9g) — 2.143 Fragen
Englisch (296), Mathematik (290), Deutsch (225), Physik (271), Biologie (283), Chemie (184), Geschichte (180), Geographie (177), Latein (237)

### Allgemeinwissen (AW) — 115 Fragen
Weltwissen, Natur & Umwelt, Kultur & Geschichte, Technik & Wissenschaft
