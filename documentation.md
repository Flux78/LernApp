# Dokumentation: Multi-Subject Master

## 1. Anwendungsbeschreibung
Der **Multi-Subject Master** ist eine adaptive Lern-Anwendung, die speziell für Schüler in Bayern (6./7. Klasse Realschule und 8./9. Klasse Gymnasium) entwickelt wurde. Die App ermöglicht das Üben von Lehrplaninhalten durch ein interaktives Quiz-System.

Kernaspekte der Anwendung sind:
- **Adaptivität:** Ein "Smart Mode" passt die Fragenhäufigkeit an den Lernerfolg des Nutzers an.
- **Gamification:** Belohnungssysteme durch Badges, Streak-Counter und ein spezielles Minecraft-Unlock-System.
- **Breites Wissen:** Ein klassenstufenunabhängiger Bereich "Allgemeinwissen" ergänzt die schulischen Inhalte.
- **Persistenz:** Lokale Speicherung aller Fortschritte ohne Notwendigkeit einer Datenbank-Anbindung.

## 2. Grobarchitektur

Die Anwendung folgt einem modularen **Single-Page-Application (SPA)** Ansatz, der vollständig im Browser läuft.

### Komponenten-Struktur
- **Präsentationsschicht (UI):** Gesteuert über `index.html` und CSS-Variablen für themenspezifisches Design.
- **Logik-Kern (`app.js`):** Verwaltet den globalen `state`, das Event-Handling und die Quiz-Algorithmen.
- **Datenkataloge (`subjects/`):** Jedes Fach ist als Modul in einem eigenen Verzeichnis organisiert (Lazy Loading von Metadaten und Inhalten).
- **Speicherschicht:** Nutzung der Web Storage API (`localStorage`) zur Persistierung des Nutzerfortschritts.

### Dateistruktur der Fach-Module
Jedes Fachverzeichnis (z. B. `subjects/eng_6r/`) folgt einer strikten Struktur (Kurzform = Key = Path):

| Datei | Beschreibung | Rolle in der Logik |
| :--- | :--- | :--- |
| `index.js` | Definiert Metadaten, Kategorien und `questionCounts`. | Basis für Fortschrittsberechnung und UI-Initialisierung. |
| `questions.js` | Enthält den eigentlichen Fragen-Pool als Array. | Datenbasis für das Quiz-System. |

### Architektur-Diagramm

```mermaid
graph TD
    subgraph Browser_Client
        UI[index.html / UI Controller]
        Logic[app.js / State Manager]
        Storage[(LocalStorage)]
    end

    subgraph Fach_Module [subjects/ID/]
        Index[index.js <br/>Metadata & Counts]
        Questions[questions.js <br/>Question Pool]
    end

    UI <--> Logic
    Logic <--> Storage
    
    Logic -- 1. Load --> Index
    Logic -- 2. Load --> Questions

    style Fach_Module fill:#f9f,stroke:#333,stroke-width:2px
```

## 3. Innerer Workflow

Der zentrale Workflow der Anwendung ist der Quiz-Zyklus, der die Auswahl, Präsentation und Auswertung von Fragen steuert.

### Technische Lade-Sequenz
Die App nutzt ein modulares Ladesystem (Lazy Loading), um die Initiallast gering zu halten.

```mermaid
sequenceDiagram
    participant User as Benutzer
    participant Core as App Core (Main)
    participant Index as Fach-Index (index.js)
    participant Questions as Kategorie-Datei ([kat].js)
    participant State as Progress/Lock Manager

    User->>Core: Wählt Fach (z.B. 'english_6r')
    Core->>Index: Dynamischer Import von index.js
    Note over Index: Registriert window.__subjectData_[ID]_index
    Index-->>Core: Metadaten bereit (Kategorien, Counts)
    Core->>State: Berechne Fortschritt & Minecraft-Status
    State-->>Core: Status: Gesperrt/Offen
    Core->>User: Zeige Dashboard mit Fortschritt
    User->>Core: Startet Lerneinheit -> Lädt [kategorie].js
```

### Quiz-Workflow

```mermaid
flowchart TD
    Start([Start der App]) --> LoadState[Lade State aus LocalStorage]
    LoadState --> Dashboard[Dashboard rendern]
    
    Dashboard --> SelectSubject[Fach auswählen]
    SelectSubject --> InitSubject[Initialisiere Fach-Daten & Registry]
    InitSubject --> RenderSubject[Dashboard mit Kategorien anzeigen]
    
    RenderSubject --> StartSession[Kategorie oder Mixed Modus wählen]
    StartSession --> PickQuestion{Smart Mode aktiv?}
    
    PickQuestion -- Ja --> WeightedPick[Gewichtete Auswahl: <br/>Häufig falsche Fragen öfter]
    PickQuestion -- Nein --> RandomPick[Einfache Zufallsauswahl]
    
    WeightedPick --> Display[Frage & Optionen rendern]
    RandomPick --> Display
    
    Display --> Answer[Nutzer antwortet]
    Answer --> Eval{Korrekt?}
    
    Eval -- Ja --> Success[Punkte + Streak erhöhen <br/> Konfetti auslösen]
    Eval -- Nein --> Fail[Streak zurücksetzen <br/> Korrekte Lösung zeigen]
    
    Success --> Save[State & Stats speichern]
    Fail --> Save
    
    Save --> Next[Nächste Frage oder Ende]
    Next --> PickQuestion
```

### Datenfluss beim Speichern
1.  **Ergebniserfassung:** Bei jeder Antwort wird das `questionStats`-Objekt im aktuellen `state` aktualisiert.
2.  **Synchronisation:** Die Funktion `syncStatsFromData()` stellt sicher, dass die Statistiken in die Fach-Struktur übertragen werden.
3.  **Persistierung:** `saveState()` konvertiert das State-Objekt in einen JSON-String und speichert es unter einem fachspezifischen Key (z.B. `lernapp_math_8g`) im `localStorage`.

## 4. Features im Detail
- **Smart Mode:** Nutzt eine Gewichtungslogik (Gewicht 20 bei Rate < 50%, Gewicht 2 bei Rate > 80%), um ineffizientes Lernen zu vermeiden.
- **Minecraft-Belohnung:** Ein spezielles Belohnungssystem für die Unterstufe.
    - **Logik:** Die App summiert die `questionCounts` aus der `index.js`. Der Fortschritt wird gegen die im `localStorage` als korrekt markierten IDs geprüft.
    - **Trigger:** Bei Erreichen definierter Schwellenwerte (z.B. 100% einer Kategorie oder des Fachs) werden Bonus-Inhalte freigeschaltet.
    
    #### Fehlerbehebung Freischaltung:
    Falls Fragen nicht freigeschaltet werden, folgende Punkte prüfen:
    1. **Namenskonvention:** Globaler Namespace muss `window.__subjectData_[FachID]_index` entsprechen.
    2. **Konsistenz:** Die Summe in `questionCounts` muss exakt der Anzahl der Objekte in den Kategorie-Dateien entsprechen.
    3. **Kategorie-Keys:** Keys in `categories` müssen identisch mit denen in `questionCounts` sein.

    #### Validierungstool:
    Um die Übereinstimmung automatisch zu prüfen, kann das Validierungsskript genutzt werden:
    ```bash
    # Syntax: node scripts/validate_counts.js ./subjects/[FACH_ORDNER]
    node scripts/validate_counts.js ./subjects/english_6r
    ```

- **Multi-Grade-Support:** Trennung der Logik und UI-Filter für Realschule (6r, 7r) und Gymnasium (8g, 9g).
- **Textaufgaben-Mastery:** Ein dediziertes System zur Förderung der Lesekompetenz in MINT-Fächern. Es nutzt spezialisierte Sub-Modi:
    - *Text Surgeon:* Filtert "Rauschen" (irrelevante Story-Infos) aus Aufgaben.
    - *Question Hunter:* Trainiert das Erkennen der Zielsetzung.
    - *Info Jigsaw:* Schult das logische Kombinieren von Fakten.
    - *Units Detective:* Verhindert typische Einheiten-Fehler.
    - *Question Clarity:* Übersetzt natürliche Sprache in mathematische Logik.


---
*Erstellt von Gemini Code Assist*