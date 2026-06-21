# 🎓 Multi-Subject Master

Eine adaptive Lern-Anwendung für Schüler in Bayern, speziell entwickelt für die **6./7. Klasse Realschule** und die **8./9. Klasse Gymnasium**.

## 🚀 Live Demo
**[App jetzt im Browser öffnen](https://flux78.github.io/LernApp/)**  

## ✨ Kern-Features
- **🧠 Smart Mode:** Ein adaptiver Algorithmus passt die Fragenhäufigkeit an den Lernerfolg an. Schwere Fragen erscheinen öfter, bereits beherrschte seltener.
- **🎮 Gamification:** Sammle Punkte, erhöhe deinen Streak und schalte Erfolge (Badges) frei.
- **⛏️ Minecraft-Belohnungssystem:** Fleißiges Lernen in Schulfächern schaltet exklusive Minecraft-Quizfragen frei (für die 6. Klasse).
- **📚 Textaufgaben-Training:** Spezialisierte Modi wie "Text Surgeon" oder "Info Jigsaw" zur gezielten Förderung der Lesekompetenz.
- **📱 Mobile First:** Voll optimiert für die Nutzung auf Smartphones und Tablets.
- **🔒 Datenschutz:** 100% lokal. Alle Fortschritte werden ausschließlich in deinem Browser (`localStorage`) gespeichert.

## 📂 Fächerübersicht

```
📚 LernApp -- 6.239 Fragen in 28 Fächern
│
├── 🏫 6. Klasse Realschule (6r)
│   ├── 🇬🇧 Englisch         (eng_6r)    485 Fr.
│   ├── 🔢 Mathematik        (math_6r)   189 Fr.
│   ├── 📖 Deutsch           (de_6r)     197 Fr.
│   ├── 🏛️ Geschichte        (hist_6r)   160 Fr.
│   ├── 🌍 Geographie        (geo_6r)    266 Fr.
│   └── ⛏️ Minecraft-Bonus   (mc)        181 Fr.
│
├── 🏫 7. Klasse Realschule (7r)
│   ├── 🇬🇧 Englisch         (eng_7r)    215 Fr.
│   ├── 🔢 Mathematik        (math_7r)   249 Fr.
│   ├── 📖 Deutsch           (de_7r)     186 Fr.
│   ├── 🏛️ Geschichte        (hist_7r)   203 Fr.
│   ├── 🌍 Geographie        (geo_7r)    228 Fr.
│   ├── ⚛️ Physik            (phys_7r)   221 Fr.
│   └── 🧬 Biologie          (bio_7r)    217 Fr.
│
├── 🏫 8. Klasse Gymnasium (8g)
│   ├── ⚛️ Physik            (phys_8g)   123 Fr.
│   ├── 🇬🇧 Englisch         (eng_8g)    202 Fr.
│   ├── 🔢 Mathematik        (math_8g)   118 Fr.
│   ├── 🧬 Biologie          (bio_8g)    240 Fr.
│   └── 🏛️ Latein            (lat_8g)    301 Fr.
│
├── 🏫 9. Klasse Gymnasium (9g)
│   ├── 🇬🇧 Englisch         (eng_9g)    296 Fr.
│   ├── 🔢 Mathematik        (math_9g)   290 Fr.
│   ├── 📖 Deutsch           (de_9g)     225 Fr.
│   ├── ⚛️ Physik            (phys_9g)   271 Fr.
│   ├── 🧬 Biologie          (bio_9g)    283 Fr.
│   ├── 🧪 Chemie            (chem_9g)   184 Fr.
│   ├── 🏛️ Geschichte        (hist_9g)   180 Fr.
│   ├── 🌍 Geographie        (geo_9g)    177 Fr.
│   └── 🏛️ Latein            (lat_9g)    237 Fr.
│
└── 🧠 Allgemeinwissen (aw)             115 Fr.
```

## 🛠️ Technik
Die Anwendung ist eine reine **Single-Page-Application (SPA)**:
- **HTML5 & CSS3:** Dynamische Themes, die sich farblich an das gewählte Fach anpassen.
- **Vanilla JavaScript:** Performante Logik-Engine ohne externe Framework-Abhängigkeiten.
- **Modularität:** Fachinhalte werden effizient per Lazy-Loading nachgeladen.

## 📖 Deployment auf GitHub Pages
1. Repository auf GitHub hochladen.
2. Gehe im Repository zu **Settings** > **Pages**.
3. Wähle unter "Build and deployment" den Branch `main` (oder `master`) und den Ordner `/ (root)`.
4. Speichern. Nach kurzer Zeit ist die App unter deiner GitHub-URL erreichbar.

---
*Erstellt als interaktive Lernhilfe basierend auf dem bayerischen Lehrplan.*