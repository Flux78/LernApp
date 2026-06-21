# Projekt-Dokumentation: LernApp (6r, 7r, 8g, 9g & AW)

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

### Smart Mode (Gewichtung)
- **Neu**: Basis 10.
- **Schwach (< 50%)**: Gewicht 20.
- **Meister (> 80%)**: Gewicht 2.

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

### 6. Klasse Realschule (6r)
Englisch, Mathematik, Deutsch, Geschichte, Geographie, Minecraft.

### 7. Klasse Realschule (7r)
Englisch, Mathematik, Deutsch, Geschichte, Geographie, Physik, Biologie.

### 8. Klasse Gymnasium (8g)
Physik, Englisch, Mathematik, Biologie, Latein.

### 9. Klasse Gymnasium (9g)
Englisch, Mathematik, Deutsch, Physik, Biologie, Chemie, Geschichte, Geographie, Latein.

### Allgemeinwissen (AW)
Weltwissen, Natur & Umwelt, Kultur & Geschichte, Technik & Wissenschaft.
