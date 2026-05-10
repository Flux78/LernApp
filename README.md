# Multi-Subject Master - Adaptive Lern-App (Bayern)

Eine intelligente Lern-Anwendung, die speziell auf den LehrplanPLUS für bayerische Schulen (6. Klasse Realschule und 8. Klasse Gymnasium) zugeschnitten ist.

## Dateistruktur

- `index.html` - Hauptanwendung (UI)
- `app.js` - Kern-Logik und State-Management
- `subjects/` - Fachspezifische Datenkataloge (z. B. `math_6r.js`, `phys_8g.js`)
- `prompt.md` - Technische Dokumentation und Konventionen
- `LernApp.code-workspace` - VS Code Workspace

## Funktionen

### 1. Klassenstufen & Fach-Umschaltung
Die App bietet Lerninhalte für zwei verschiedene Schultypen und Jahrgangsstufen:
- **6. Klasse Realschule (6r):** Englisch, Mathematik, Deutsch, Geschichte, Geographie.
- **8. Klasse Gymnasium (8g):** Physik, Englisch, Mathematik, Biologie, Latein.

### 2. Achievement- & Mastery-System
Ein motivierendes Erfolgssystem belohnt kontinuierliches Lernen:
- **Badges:** Sammle Auszeichnungen für richtige Antworten, hohe Streaks (Serien) oder das Erreichen bestimmter Punktzahlen.
- **Mastery-Status:** Erreiche in allen Fächern einer Klassenstufe eine Quote von über 80 %, um die gesamte Stufe zu „meistern“ (markiert durch einen goldenen Glow und ein Kronen-Icon in der Statistik).

### 3. Smart Mode (Adaptive Schwierigkeit)
Die App lernt mit dir mit. Im **Smart Mode** werden Fragen, die du häufig falsch beantwortest, automatisch öfter abgefragt, während bereits gemeisterte Fragen seltener erscheinen.

### 4. Interaktive Hilfen & UX
- **Dynamische Hintergrundbilder:** Jedes Fach hat einen dezenten, thematisch passenden Hintergrund.
- **💡 Hinweis-System:** Benötigst du Hilfe? Hinweise erscheinen erst beim Hovern über das Glühbirnen-Icon. Wenn du zu lange zögerst, fängt das Icon an zu wackeln.
- **Session-Fortschritt:** Ein animierter Balken zeigt dir, wie nah du deinem täglichen Etappenziel (10 Fragen) bist.

### 5. Persistenz
Alle Lernfortschritte, Punkte und Einstellungen werden sicher im Browser gespeichert. Du kannst dort weitermachen, wo du aufgehört hast.

## Lehrplan-Schwerpunkte

- **Mathematik:** Von Bruchrechnung (6r) bis hin zu linearen Funktionen und Stochastik (8g).
- **Sprachen:** Fokus auf Alltagskommunikation und Zeitformen (Englisch) sowie komplexe Grammatik wie AcI und PC (Latein).
- **Naturwissenschaften:** Grundlagen der Mechanik, Energie und Zellbiologie.

## Verwendung

1. Öffne die `index.html` in einem modernen Webbrowser.
2. Wähle deine **Klassenstufe** im unteren Bereich aus.
3. Wähle ein **Fach** in der oberen Navigationsleiste.
4. Starte direkt mit dem **Gemischt-Modus** oder wähle eine spezifische Kategorie im Dashboard.

## Speicherung der Statistiken

Daten werden im LocalStorage unter dem Präfix `lernapp_` gespeichert:
- Globale Einstellungen: `lernapp_darkMode`
- Fachspezifisch: `lernapp_english`, `lernapp_phys_8g`, etc.