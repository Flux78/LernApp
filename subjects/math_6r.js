// ============================================
// MATHEMATIK - LernApp Daten
// ============================================

const math6rData = {
    name: "Mathematik",
    icon: "🔢",
    color: "#3b82f6",
    description: "Mathematik üben mit verschiedenen Themen",
    
    categories: {
        grundrechenarten: {
            name: "Grundrechenarten",
            icon: "➕",
            color: "#10b981",
            desc: "Addition, Subtraktion, Multiplikation, Division"
        },
        brueche: {
            name: "Brüche",
            icon: "½",
            color: "#f59e0b",
            desc: "Bruchrechnung und Dezimalzahlen"
        },
        prozente: {
            name: "Prozente",
            icon: "%",
            color: "#ec4899",
            desc: "Prozentrechnung"
        },
        geometrie: {
            name: "Geometrie",
            icon: "📐",
            color: "#8b5cf6",
            desc: "Formen, Flächen, Körper"
        },
        einheiten: {
            name: "Einheiten",
            icon: "📏",
            color: "#06b6d4",
            desc: "Längen, Flächen, Massen, Zeit"
        },
        zahlen: {
            name: "Zahlen",
            icon: "🔢",
            color: "#3b82f6",
            desc: "Natürliche Zahlen, Negative Zahlen"
        },
        gleichungen: {
            name: "Gleichungen",
            icon: "⚖️",
            color: "#22c55e",
            desc: "Einfache Gleichungen lösen"
        }
    },

    // Fragen nach Kategorien
    questions: {
        grundrechenarten: [
            { question: "Was ist 12 × 8?", answers: ["96", "108", "88", "72"], correct: 0, hint: "Multiplikation", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 100 - 7 × 8?", answers: ["744", "44", "56", "36"], correct: 1, hint: "Punkt vor Strich", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 2³ (2 hoch 3)?", answers: ["6", "8", "9", "16"], correct: 1, hint: "2 × 2 × 2", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie berechnet man den Mittelwert von 10, 20 und 30?", answers: ["(10+20+30) × 3", "(10+20+30) ÷ 3", "10+20+30", "(10×20×30) ÷ 3"], correct: 1, hint: "Summe ÷ Anzahl", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 144 ÷ 12?", answers: ["10", "11", "12", "13"], correct: 2, hint: "Division", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 7² + 3²?", answers: ["58", "100", "49", "52"], correct: 0, hint: "49 + 9", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 250 + 150 ÷ 2?", answers: ["200", "325", "400", "175"], correct: 1, hint: "Punkt vor Strich!", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 11 × 11?", answers: ["111", "121", "131", "141"], correct: 1, hint: "Quadratzahl", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne: (10 + 5) × 4", answers: ["30", "40", "50", "60"], correct: 3, hint: "Klammer zuerst", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viel ist 1000 ÷ 8?", answers: ["125", "150", "200", "250"], correct: 0, hint: "Halbe von 250", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 0,5 × 20?", answers: ["5", "10", "15", "100"], correct: 1, hint: "Die Hälfte", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 1,2 + 0,85?", answers: ["1,95", "2,05", "2,15", "1,07"], correct: 1, hint: "Stellenwert beachten", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 4,5 ÷ 9?", answers: ["0,5", "0,05", "5", "2"], correct: 0, hint: "9 passt 0,5 mal in 4,5", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 3² × 2³?", answers: ["36", "72", "48", "100"], correct: 1, hint: "9 × 8", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne: 5 × (12 - 4) + 2", answers: ["42", "62", "40", "38"], correct: 0, hint: "Klammer -> Punkt -> Strich", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die Wurzel aus 81?", answers: ["7", "8", "9", "10"], correct: 2, hint: "x × x = 81", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne: 12,5 × 4", answers: ["48", "50", "52,5", "60"], correct: 1, hint: "12 × 4 + 0,5 × 4", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 1000 - 333?", answers: ["666", "667", "677", "767"], correct: 1, hint: "Subtraktion", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 1,5 ÷ 0,5?", answers: ["0,3", "3", "30", "7,5"], correct: 1, hint: "Wie viele Halbe passen in anderthalb?", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne: 7 × 9 + 3 × 9", answers: ["63", "81", "90", "100"], correct: 2, hint: "(7+3) × 9", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 4⁴?", answers: ["16", "64", "256", "1024"], correct: 2, hint: "4*4*4*4", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 15 × 15?", answers: ["215", "225", "235", "255"], correct: 1, hint: "Quadratzahl", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne: (24 + 16) ÷ (12 - 4)", answers: ["5", "8", "10", "40"], correct: 0, hint: "Klammern zuerst", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 0,1 × 0,1?", answers: ["0,1", "0,01", "1,0", "0,001"], correct: 1, hint: "Eine Zehntel von einer Zehntel", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die Hälfte von 0,7?", answers: ["0,3", "0,35", "0,4", "0,45"], correct: 1, hint: "70 ÷ 2", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne: 2 × 3 × 4 × 5", answers: ["24", "60", "120", "240"], correct: 2, hint: "Multiplikationskette", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 900 ÷ 20?", answers: ["4,5", "45", "90", "450"], correct: 1, hint: "Nullen kürzen", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 10³?", answers: ["30", "100", "1000", "10000"], correct: 2, hint: "Eine Eins mit drei Nullen", stats: { correct: 0, total: 0, difficulty: 1.0 } }
        ],
        brueche: [
            { question: "Wie viel Prozent sind 3/4?", answers: ["25%", "50%", "75%", "80%"], correct: 2, hint: "3 ÷ 4 = 0,75", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie schreibt man 0,25 als Bruch?", answers: ["1/2", "1/3", "1/4", "1/5"], correct: 2, hint: "0,25 = 25/100", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie schreibt man 5/8 als Dezimalzahl?", answers: ["0,58", "0,625", "0,8", "0,85"], correct: 1, hint: "5 ÷ 8", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 1/2 + 1/4?", answers: ["1/6", "2/6", "3/4", "1"], correct: 2, hint: "Gleicher Nenner: 2/4 + 1/4", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 3/4 von 100?", answers: ["25", "50", "75", "100"], correct: 2, hint: "100 × 3/4", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie schreibt man 1/5 als Dezimalzahl?", answers: ["0,15", "0,2", "0,5", "0,25"], correct: 1, hint: "1 ÷ 5", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 2/3 - 1/3?", answers: ["1/3", "1/6", "1/9", "2/3"], correct: 0, hint: "Gleicher Nenner", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 0,5 als Bruch?", answers: ["1/3", "1/4", "1/2", "2/3"], correct: 2, hint: "Die Hälfte", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was passiert beim Erweitern eines Bruchs?", answers: ["Der Wert wird größer", "Der Wert wird kleiner", "Der Wert bleibt gleich", "Der Zähler wird kleiner"], correct: 2, hint: "Zähler und Nenner mit gleicher Zahl malnehmen", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Kürze 12/16 so weit wie möglich.", answers: ["6/8", "3/4", "1/2", "2/3"], correct: 1, hint: "Durch 4 teilen", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 1/3 von 60?", answers: ["10", "20", "30", "40"], correct: 1, hint: "60 ÷ 3", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viel ist 0,1 + 0,2 + 0,3?", answers: ["0,3", "0,5", "0,6", "6,0"], correct: 2, hint: "Addition von Dezimalzahlen", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Welcher Bruch ist größer: 1/2 oder 1/3?", answers: ["1/2", "1/3", "Beide gleich", "Kommt auf den Zähler an"], correct: 0, hint: "Je kleiner der Nenner, desto größer das Stück", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist der Kehrbruch von 2/5?", answers: ["5/2", "2/5", "-2/5", "1/2"], correct: 0, hint: "Oben und unten vertauschen", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne: 0,4 × 0,2", answers: ["0,8", "0,08", "8,0", "0,008"], correct: 1, hint: "4*2 = 8, dann 2 Kommastellen", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist ein 'echter Bruch'?", answers: ["Zähler > Nenner", "Zähler < Nenner", "Zähler = Nenner", "Ein Bruch mit Komma"], correct: 1, hint: "Kleiner als 1 Ganzes", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wandle 1 1/2 in einen unechten Bruch um.", answers: ["1/2", "2/2", "3/2", "4/2"], correct: 2, hint: "Ein Ganzes sind zwei Halbe", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 10% als Bruch?", answers: ["1/10", "1/100", "10/1", "1/2"], correct: 0, hint: "10 von 100", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne: 1/4 + 1/4", answers: ["1/8", "2/8", "1/2", "1"], correct: 2, hint: "2/4 = 1/2", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 0,75 - 0,25?", answers: ["0,25", "0,5", "0,55", "1,0"], correct: 1, hint: "75 Cent - 25 Cent", stats: { correct: 0, total: 0, difficulty: 1.0 } }
        ],
        prozente: [
            { question: "Was ist 20% von 150?", answers: ["20", "30", "40", "50"], correct: 1, hint: "150 × 0,20", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 50% von 80?", answers: ["30", "40", "50", "60"], correct: 1, hint: "Die Hälfte", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 10% von 200?", answers: ["10", "20", "30", "40"], correct: 1, hint: "Eine Zehntel", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Ein Preis von 100€ wird um 20% reduziert. Wie viel kostet er jetzt?", answers: ["70€", "75€", "80€", "85€"], correct: 2, hint: "100€ - 20€", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 25% von 80?", answers: ["15", "20", "25", "30"], correct: 1, hint: "Ein Viertel", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 75% von 200?", answers: ["100", "125", "150", "175"], correct: 2, hint: "Drei Viertel", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Ein Preis steigt von 50€ auf 60€. Um wie viel Prozent ist er gestiegen?", answers: ["10%", "15%", "20%", "25%"], correct: 2, hint: "10€ von 50€", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 5% von 300?", answers: ["10", "15", "20", "25"], correct: 1, hint: "300 × 0,05", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 1% von 1000?", answers: ["1", "10", "100", "0,1"], correct: 1, hint: "Ein Hundertstel", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 100% von 42?", answers: ["1", "0", "42", "84"], correct: 2, hint: "Das Ganze", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 33 1/3 % von 90?", answers: ["10", "20", "30", "45"], correct: 2, hint: "Ein Drittel", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Ein Rabatt von 50% bedeutet...", answers: ["Preis verdoppelt", "Preis bleibt gleich", "Preis halbiert", "10€ gespart"], correct: 2, hint: "Hälfte", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wandle 0,45 in Prozent um.", answers: ["4,5%", "45%", "0,45%", "450%"], correct: 1, hint: "Mal 100 nehmen", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist mehr: 1/2 oder 40%?", answers: ["1/2", "40%", "Beide gleich", "Kann man nicht sagen"], correct: 0, hint: "1/2 = 50%", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Berechne 200% von 5.", answers: ["5", "10", "15", "20"], correct: 1, hint: "Das Doppelte", stats: { correct: 0, total: 0, difficulty: 1.0 } }
        ],
        geometrie: [
            { question: "Wie heißt ein Dreieck mit drei gleich langen Seiten?", answers: ["Gleichschenklig", "Gleichseitig", "Rechtwinklig", "Ungleichseitig"], correct: 1, hint: "Alle Seiten gleich", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie berechnet man den Flächeninhalt eines Rechtecks?", answers: ["Länge + Breite", "Länge × Breite", "2 × (Länge + Breite)", "Länge ÷ Breite"], correct: 1, hint: "Länge mal Breite", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die Summe der Innenwinkel eines Dreiecks?", answers: ["90°", "180°", "270°", "360°"], correct: 1, hint: "Halbkreis", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Ecken hat ein Würfel?", answers: ["6", "8", "12", "16"], correct: 1, hint: "3D-Objekt", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die Wurzel aus 144?", answers: ["10", "11", "12", "14"], correct: 2, hint: "12 × 12", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie heißt ein Winkel, der genau 90° misst?", answers: ["Spitzer Winkel", "Rechter Winkel", "Stumpfer Winkel", "Voller Winkel"], correct: 1, hint: "Wie bei einem Quadrat", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist der Umfang eines Kreises mit Radius r?", answers: ["2πr", "πr²", "πr", "2πr²"], correct: 0, hint: "2 × Pi × Radius", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Seiten hat ein Fünfeck?", answers: ["3", "4", "5", "6"], correct: 2, hint: "Penta = 5", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist der Flächeninhalt eines Quadrats mit a = 6 cm?", answers: ["12 cm²", "24 cm²", "36 cm²", "48 cm²"], correct: 2, hint: "a × a", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie nennt man eine Linie, die den Kreisrand mit dem Mittelpunkt verbindet?", answers: ["Durchmesser", "Radius", "Sehne", "Tangente"], correct: 1, hint: "Halber Durchmesser", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist ein Prisma?", answers: ["Ein runder Körper", "Körper mit zwei gleichen Grundflächen", "Ein flaches Dreieck", "Eine Kugel"], correct: 1, hint: "Boden und Deckel sind gleich", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie groß ist die Winkelsumme in einem Viereck?", answers: ["180°", "270°", "360°", "540°"], correct: 2, hint: "Zwei Dreiecke", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Welche Form hat die Grundfläche eines Zylinders?", answers: ["Quadrat", "Dreieck", "Kreis", "Trapez"], correct: 2, hint: "Wie eine Konservendose", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Kanten hat ein Quader?", answers: ["6", "8", "10", "12"], correct: 3, hint: "4 oben, 4 unten, 4 stehend", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist ein 'stumpfer Winkel'?", answers: ["< 90°", "Genau 90°", "> 90° und < 180°", "180°"], correct: 2, hint: "Größer als der rechte Winkel", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie berechnet man den Umfang eines Rechtecks?", answers: ["a * b", "2*a + 2*b", "a + b", "a² + b²"], correct: 1, hint: "Alle vier Seiten zusammen", stats: { correct: 0, total: 0, difficulty: 1.0 } }
        ],
        einheiten: [
            { question: "Wie viele Millimeter sind 3,5 Meter?", answers: ["35 mm", "350 mm", "3500 mm", "35000 mm"], correct: 2, hint: "1 m = 1000 mm", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Gramm sind 2,5 Kilogramm?", answers: ["25 g", "250 g", "2500 g", "25000 g"], correct: 2, hint: "1 kg = 1000 g", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Sekunden sind 5 Minuten?", answers: ["60 s", "300 s", "360 s", "500 s"], correct: 1, hint: "1 min = 60 s", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Minuten sind 1,5 Stunden?", answers: ["75 min", "90 min", "100 min", "120 min"], correct: 1, hint: "1 h = 60 min", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele cm³ sind 1 Liter?", answers: ["100 cm³", "1000 cm³", "10000 cm³", "10 cm³"], correct: 1, hint: "1 dm³ = 1 l", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die Basiseinheit der Masse?", answers: ["Gramm", "Kilogramm", "Tonne", "Milligramm"], correct: 1, hint: "SI-Einheit", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wandle 0,5 km in Meter um.", answers: ["5 m", "50 m", "500 m", "5000 m"], correct: 2, hint: "1 km = 1000 m", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele cm² sind 1 dm²?", answers: ["10", "100", "1000", "1"], correct: 1, hint: "10 * 10", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Ar (a) sind ein Hektar (ha)?", answers: ["10", "100", "1000", "10000"], correct: 1, hint: "Hekto = 100", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viel wiegt ein Milliliter Wasser ungefähr?", answers: ["1 mg", "1 g", "10 g", "1 kg"], correct: 1, hint: "1 l = 1 kg", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Stunden hat eine Woche?", answers: ["144", "168", "120", "180"], correct: 1, hint: "7 * 24", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele m² sind 1 km²?", answers: ["1000", "10000", "100000", "1000000"], correct: 3, hint: "1000m * 1000m", stats: { correct: 0, total: 0, difficulty: 1.0 } }
        ],
        zahlen: [
            { question: "Was ist der kleinste gemeinsame Teiler von 12 und 18?", answers: ["2", "3", "6", "9"], correct: 2, hint: "KGV", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die nächste Primzahl nach 7?", answers: ["9", "10", "11", "13"], correct: 2, hint: "Nur durch 1 und sich selbst teilbar", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Welche Zahl ist größer: -3 oder -5?", answers: ["-3", "-5", "Beide gleich", "Kommt darauf an"], correct: 0, hint: "Minus-Zahlen: Je näher bei 0, desto größer", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist |-5|?", answers: ["-5", "0", "5", "10"], correct: 2, hint: "Betrag = Abstand von 0", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist 2⁻³?", answers: ["-6", "-8", "1/8", "8"], correct: 2, hint: "Negativer Exponent = Kehrbruch", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die Quersumme von 123?", answers: ["3", "6", "9", "12"], correct: 1, hint: "1 + 2 + 3", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Welche Zahl ist durch 3 teilbar?", answers: ["13", "16", "21", "22"], correct: 2, hint: "Quersumme durch 3 teilbar", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die größte einstellige Primzahl?", answers: ["5", "7", "9", "11"], correct: 1, hint: "Nur durch 1 und sich selbst teilbar", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Ist 0 eine natürliche Zahl (in der Schule meistens)?", answers: ["Ja", "Nein", "Nur am Wochenende", "Nur in Bayern"], correct: 0, hint: "N0 Menge", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ergibt -10 + 15?", answers: ["-25", "-5", "5", "25"], correct: 2, hint: "Rechne von -10 nach rechts", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Welche Ziffer steht an der Zehntelstelle bei 123,456?", answers: ["1", "3", "4", "5"], correct: 2, hint: "Erste Stelle nach dem Komma", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist die kleinste Primzahl?", answers: ["0", "1", "2", "3"], correct: 2, hint: "Die einzige gerade Primzahl", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Woran erkennt man Zahlen, die durch 5 teilbar sind?", answers: ["Enden auf 0 oder 5", "Enden auf 5", "Quersumme ist 5", "Sind ungerade"], correct: 0, hint: "5er-Reihe", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Wie viele Nullen hat eine Million?", answers: ["3", "6", "9", "12"], correct: 1, hint: "Tausend mal Tausend", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist das Ergebnis von 5 - (-3)?", answers: ["2", "8", "-2", "-8"], correct: 1, hint: "Minus und Minus wird Plus", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Runde 4,567 auf zwei Dezimalstellen.", answers: ["4,56", "4,57", "4,60", "5,00"], correct: 1, hint: "Dritte Stelle ist 7 -> aufrunden", stats: { correct: 0, total: 0, difficulty: 1.0 } }
        ],
        gleichungen: [
            { question: "Löse: x + 5 = 12", answers: ["5", "6", "7", "8"], correct: 2, hint: "x = 12 - 5", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 2x = 10", answers: ["4", "5", "6", "8"], correct: 1, hint: "x = 10 ÷ 2", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: x - 3 = 7", answers: ["4", "8", "9", "10"], correct: 3, hint: "x = 7 + 3", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: x/4 = 3", answers: ["7", "10", "12", "16"], correct: 2, hint: "x = 3 × 4", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 3x + 2 = 14", answers: ["3", "4", "5", "6"], correct: 1, hint: "3x = 12, dann x = 4", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 5x - 10 = 15", answers: ["3", "4", "5", "6"], correct: 2, hint: "5x = 25", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 2x + 5 = x + 10", answers: ["2", "3", "4", "5"], correct: 3, hint: "x = 10 - 5", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 4(x - 2) = 12", answers: ["3", "4", "5", "6"], correct: 2, hint: "x - 2 = 3", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 10 - x = 4", answers: ["4", "6", "10", "14"], correct: 1, hint: "10 - 4 = x", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was ist x in der Gleichung: x + x + x = 30?", answers: ["3", "10", "15", "30"], correct: 1, hint: "3x = 30", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 0,5x = 4", answers: ["2", "4", "8", "16"], correct: 2, hint: "Hälfte von x ist 4", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 20 ÷ x = 5", answers: ["2", "4", "5", "100"], correct: 1, hint: "Wie oft passt 5 in 20?", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Was muss man bei x - 100 = 200 auf beiden Seiten tun?", answers: ["100 abziehen", "100 addieren", "Durch 100 teilen", "Mal 100 nehmen"], correct: 1, hint: "Gegenteil von minus", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: 3x - 1 = 20", answers: ["6", "7", "8", "21"], correct: 1, hint: "3x = 21", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Löse: x/2 + 5 = 10", answers: ["5", "10", "15", "20"], correct: 1, hint: "x/2 = 5", stats: { correct: 0, total: 0, difficulty: 1.0 } },
            { question: "Welcher Wert für x ist eine Lösung von x² = 25?", answers: ["2,5", "5", "12,5", "50"], correct: 1, hint: "5 * 5", stats: { correct: 0, total: 0, difficulty: 1.0 } }
        ]
    }
};