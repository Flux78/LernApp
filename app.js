// ============================================
// LERNAPP - HAUPTANWENDUNG
// ============================================

// Fächer-Registrierung
let subjectRegistry = {};
// Aktuelles Fach
let currentSubject = 'english';
let currentSubjectData = null;

// ======================= STATE =======================
let state = {
    grade: '6r',
    points: 0,
    streak: 0,
    maxStreak: 0,
    total: 0,
    correct: 0,
    smartMode: true,
    confetti: true,
    darkMode: false,
    currentMode: 'categories',
    currentCategory: null,
    difficultyFilter: null,
    categories: {},
    answers: [],
    questionStats: {},
    subjectStats: {},
    sessionCount: 0,
    unlockedIndices: [], // Speichert die Keys der zufällig freigeschalteten Fragen
    showSkipButton: true
};

let currentQuestion = null;
let answered = false;
let hintTimer = null;

// ======================= INITIALISIERUNG =======================

function initializeState() {
    // Dynamische Registrierung, um sicherzustellen, dass die Daten aus den externen Dateien verfügbar sind
    subjectRegistry = {
        english: { grade: '6r',
            data: typeof english6rData !== 'undefined' ? english6rData : null, 
            key: 'english', name: 'Englisch', abbr: 'EN',
            bg: 'url("https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1000&auto=format&fit=crop")' 
        },
        math: { grade: '6r',
            data: typeof math6rData !== 'undefined' ? math6rData : null, 
            key: 'math', name: 'Mathematik', abbr: 'MA',
            bg: 'url("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop")'
        },
        german: { grade: '6r',
            data: typeof german6rData !== 'undefined' ? german6rData : null, 
            key: 'german', name: 'Deutsch', abbr: 'DE',
            bg: 'url("https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop")'
        },
        history: { grade: '6r',
            data: typeof history6rData !== 'undefined' ? history6rData : null, 
            key: 'history', name: 'Geschichte', abbr: 'HI',
            bg: 'url("https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop")'
        },
        geography: { grade: '6r',
            data: typeof geography6rData !== 'undefined' ? geography6rData : null, 
            key: 'geography', name: 'Geographie', abbr: 'GE',
            bg: 'url("https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1000&auto=format&fit=crop")'
        },
        minecraft: { grade: '6r',
            data: typeof minecraft6rData !== 'undefined' ? minecraft6rData : null,
            key: 'minecraft', name: 'Minecraft', abbr: 'MC',
            bg: 'url("https://images.unsplash.com/photo-1622015663319-e97e697503ee?q=80&w=1000&auto=format&fit=crop")'
        },
        phys_8g: { grade: '8g',
            data: typeof phys8gData !== 'undefined' ? phys8gData : null,
            key: 'phys_8g', name: 'Physik', abbr: 'PH',
            bg: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop")'
        },
        eng_8g: { grade: '8g',
            data: typeof eng8gData !== 'undefined' ? eng8gData : null,
            key: 'eng_8g', name: 'Englisch', abbr: 'EN',
            bg: 'url("https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1000&auto=format&fit=crop")'
        },
        math_8g: { grade: '8g',
            data: typeof math8gData !== 'undefined' ? math8gData : null,
            key: 'math_8g', name: 'Mathematik', abbr: 'MA',
            bg: 'url("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop")'
        },
        bio_8g: { grade: '8g',
            data: typeof bio8gData !== 'undefined' ? bio8gData : null,
            key: 'bio_8g', name: 'Biologie', abbr: 'BI',
            bg: 'url("https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1000&auto=format&fit=crop")'
        },
        lat_8g: { grade: '8g',
            data: typeof lat8gData !== 'undefined' ? lat8gData : null,
            key: 'lat_8g', name: 'Latein', abbr: 'LA',
            bg: 'url("https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop")'
        }
    };

    // Fehlerprüfung: Überprüfen, ob alle Fach-Skripte erfolgreich geladen wurden
    Object.entries(subjectRegistry).forEach(([key, subject]) => {
        if (!subject.data) {
            console.warn(`[LernApp] Warnung: Das Daten-Skript für das Fach "${subject.name}" (${key}) konnte nicht geladen werden. Bitte Dateipfad und Syntax prüfen.`);
        }
    });

    if (subjectRegistry[currentSubject]) {
        currentSubjectData = subjectRegistry[currentSubject].data;
    }

    if (!currentSubjectData) {
        console.error("Daten für Fach konnten nicht geladen werden:", currentSubject);
        return;
    }
    const data = currentSubjectData;
    
    // Initialisiere Kategorie-Stats
    Object.keys(data.categories).forEach(catKey => {
        if (!state.categories[catKey]) {
            state.categories[catKey] = { correct: 0, total: 0 };
        }
        if (!state.questionStats[catKey]) {
            state.questionStats[catKey] = {};
        }
    });
}

function loadState() {
    // Globaler DarkMode (unabhängig vom Fach-Speicherstand)
    const globalDarkMode = localStorage.getItem('lernapp_darkMode') === 'true';
    const globalGrade = localStorage.getItem('lernapp_grade') || '6r';
    const lastSubject = localStorage.getItem('lernapp_currentSubject');
    
    state.grade = globalGrade;
    state.darkMode = globalDarkMode;
    
    // Sicherstellen, dass das aktuelle Fach zur gewählten Klassenstufe passt
    if (lastSubject) {
        currentSubject = lastSubject;
    }

    const saved = localStorage.getItem(`lernapp_${currentSubject}`);
    if (saved) {
        const parsed = JSON.parse(saved);
        // Falls das gespeicherte Fach eine andere Klasse hat als global gewählt, 
        // überschreiben wir die Klassenstufe des Fachs NICHT global.
        if (parsed.grade && parsed.grade !== state.grade) parsed.grade = state.grade;
        const previousDarkMode = state.darkMode; // Darkmode vor dem Überschreiben bewahren
        Object.assign(state, parsed);
        state.darkMode = previousDarkMode;
    }
    
    initializeState();
    
    // Falls das geladene Fach nicht zur Klassenstufe passt (z.B. nach Klassenwechsel),
    // erzwingen wir den Wechsel auf das erste Fach der korrekten Klasse.
    if (subjectRegistry[currentSubject] && subjectRegistry[currentSubject].grade !== state.grade) {
        const firstMatch = Object.keys(subjectRegistry).find(k => subjectRegistry[k].grade === state.grade);
        if (firstMatch) switchSubject(firstMatch);
        return;
    }

    syncStatsToData();
    
    // Theme immer anwenden, unabhängig davon ob State existiert oder nicht
    applyTheme();
}

function saveState() {
    syncStatsFromData();
    localStorage.setItem('lernapp_darkMode', state.darkMode);
    localStorage.setItem('lernapp_grade', state.grade);
    localStorage.setItem('lernapp_currentSubject', currentSubject);
    localStorage.setItem(`lernapp_${currentSubject}`, JSON.stringify(state));
}

function syncStatsToData() {
    if (!currentSubjectData) return;
    
    // Sync Frage-Stats zu Daten
    Object.entries(state.questionStats).forEach(([catKey, questions]) => {
        const categoryQuestions = currentSubjectData.questions?.[catKey];
        if (categoryQuestions) {
            Object.entries(questions).forEach(([index, stats]) => {
                const idx = parseInt(index);
                if (categoryQuestions[idx]) {
                    categoryQuestions[idx].stats = { ...stats };
                }
            });
        }
    });
}

function syncStatsFromData() {
    if (!currentSubjectData) return;
    
    state.questionStats = {};
    
    Object.entries(currentSubjectData.questions || {}).forEach(([catKey, questions]) => {
        state.questionStats[catKey] = {};
        questions.forEach((q, idx) => {
            state.questionStats[catKey][idx] = { ...q.stats };
        });
    });
}

// ======================= FACH-UMSCHALTUNG =======================

function changeGrade(grade) {
    state.grade = grade;
    saveState();
    
    // Erstes verfügbares Fach der neuen Stufe wählen
    const available = Object.entries(subjectRegistry).filter(([k, s]) => s.grade === grade && s.data);
    if (available.length > 0) {
        switchSubject(available[0][0]);
    }
    updateGradeUI();
}

function switchSubject(subjectKey) {
    // Sicherheitsscheck: Existiert das Fach in der Registry?
    if (!subjectRegistry[subjectKey] || !subjectRegistry[subjectKey].data) {
        console.error("Fach-Daten nicht verfügbar:", subjectKey);
        return;
    }

    // Altes Fach speichern, bevor wir wechseln
    saveState();

    // Wechsle Fach
    currentSubject = subjectKey;
    currentSubjectData = subjectRegistry[subjectKey].data;

    // Im LocalStorage sofort aktualisieren
    localStorage.setItem('lernapp_currentSubject', currentSubject);

    // Lade neues Fach
    state = {
        grade: state.grade,
        points: 0, streak: 0, maxStreak: 0, total: 0, correct: 0,
        smartMode: true, confetti: true, darkMode: state.darkMode,
        currentMode: 'categories', currentCategory: null, difficultyFilter: null,
        showSkipButton: state.showSkipButton,
        categories: {}, answers: [], questionStats: {}, subjectStats: {},
        unlockedIndices: []
    };
    
    loadState();
    
    // UI aktualisieren
    renderSubjectSelector();
    updateSubjectUI();
    renderDashboard();
    updateStatsBar();
    
    // Zurück zum Dashboard
    showPanel('dashboard');
    
    // Aktiven Tab markieren
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.nav-tab').classList.add('active');
}

function updateGradeUI() {
    document.querySelectorAll('[id^="grade-"]').forEach(btn => {
        btn.classList.toggle('active', btn.id === `grade-${state.grade}`);
    });
}

// ======================= REWARD SYSTEM (MINECRAFT UNLOCK) =======================

function getMinecraftStatus() {
    // Minecraft-Logik gilt nur für die 6. Klasse
    if (state.grade !== '6r') return { unlocked: true, unlockedCount: 999, percent: 100 };

    let totalOtherAnswers = 0;
    let anySubjectReachedTen = false;
    let totalPossibleMinecraft = 0;
    let totalPossibleOtherQuestions = 0;

    Object.entries(subjectRegistry).forEach(([key, subject]) => {
        if (!subject.data || subject.grade !== '6r') return;
        
        let sTotal = 0;
        if (key === currentSubject) {
            sTotal = state.total;
        } else {
            const saved = localStorage.getItem(`lernapp_${key}`);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    sTotal = parsed.total || 0;
                } catch(e) {}
            }
        }

        // Berechne die Gesamtanzahl der verfügbaren Fragen in diesem Fach
        let subjectQuestionCount = 0;
        Object.values(subject.data.questions).forEach(cat => subjectQuestionCount += cat.length);

        if (key === 'minecraft') {
            totalPossibleMinecraft = subjectQuestionCount;
        } else {
            totalPossibleOtherQuestions += subjectQuestionCount;
            totalOtherAnswers += sTotal;
            if (sTotal >= 10) anySubjectReachedTen = true;
        }
    });

    // Dynamisches Verhältnis: Wie viele normale Fragen ergeben eine Minecraft-Frage?
    const questionsPerUnlock = totalPossibleMinecraft > 0 ? (totalPossibleOtherQuestions / totalPossibleMinecraft) : 10;
    let unlockedCount = Math.floor(totalOtherAnswers / questionsPerUnlock);
    // Deckelung auf die maximal verfügbaren Minecraft-Fragen
    unlockedCount = Math.min(unlockedCount, totalPossibleMinecraft);
    
    // NEU: Zufällige Zuordnung der freigeschalteten Fragen
    if (currentSubject === 'minecraft') {
        if (!state.unlockedIndices) state.unlockedIndices = [];
        
        // Wenn wir mehr Fragen verdient haben, als IDs gespeichert sind: neue würfeln
        if (state.unlockedIndices.length < unlockedCount) {
            let allPossibleKeys = [];
            Object.entries(currentSubjectData.questions).forEach(([cat, list]) => {
                list.forEach((_, idx) => allPossibleKeys.push(`${cat}:${idx}`));
            });
            
            // Nur die nehmen, die noch NICHT in unlockedIndices sind
            let lockedKeys = allPossibleKeys.filter(k => !state.unlockedIndices.includes(k));
            
            while (state.unlockedIndices.length < unlockedCount && lockedKeys.length > 0) {
                const randIdx = Math.floor(Math.random() * lockedKeys.length);
                const pickedKey = lockedKeys.splice(randIdx, 1)[0];
                state.unlockedIndices.push(pickedKey);
            }
            // State speichern, damit die Auswahl permanent bleibt
            saveState();
        }
    }

    return {
        unlocked: anySubjectReachedTen,
        unlockedCount: unlockedCount,
        totalPossible: totalPossibleMinecraft,
        percent: totalPossibleMinecraft > 0 ? Math.min(100, Math.round((unlockedCount / totalPossibleMinecraft) * 100)) : 0,
        questionsPerUnlock: questionsPerUnlock
    };
}

function updateSubjectUI() {
    if (!currentSubjectData) return;

    // Minecraft Modus global umschalten
    document.body.classList.toggle('minecraft-mode', currentSubject === 'minecraft');

    // Titel aktualisieren
    document.getElementById('app-title').textContent = `🎓 ${currentSubjectData.name} Master`;
    
    // Fach-Selektor aktualisieren
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.backgroundColor = ''; // Reset
        btn.style.color = '';
        
        if (btn.dataset.subject === currentSubject) {
            btn.classList.add('active');
            btn.style.backgroundColor = currentSubjectData.color;
            btn.style.color = 'white';
        }
    });
    
    // Theme anpassen basierend auf Fach
    document.documentElement.style.setProperty('--primary-color', currentSubjectData.color);
    
    // Hintergrundbild anpassen
    const bg = subjectRegistry[currentSubject]?.bg || 'none';
    document.documentElement.style.setProperty('--subject-bg', bg);
}

function renderSubjectSelector() {
    const container = document.getElementById('subject-selector');
    if (!container) return;
    
    container.innerHTML = '';
    Object.entries(subjectRegistry).forEach(([key, subject]) => {
        if (!subject.data || subject.grade !== state.grade) return; 
        
        const status = getMinecraftStatus();
        const isLocked = key === 'minecraft' && !status.unlocked;
        
        const btn = document.createElement('button');
        // Minecraft Button bekommt immer das Block-Design
        btn.className = key === 'minecraft' ? 'subject-btn minecraft-btn-style' : 'subject-btn';
        
        if (isLocked) {
            btn.style.opacity = '0.5';
            btn.style.filter = 'grayscale(1)';
            btn.innerHTML = `🔒 Minecraft`;
            btn.title = "Beantworte erst 10 Fragen in einem anderen Fach!";
            btn.onclick = () => alert("Lerne erst fleißig in den anderen Fächern! Sobald du 10 Fragen in einem Fach beantwortet hast, wird Minecraft freigeschaltet.");
            container.appendChild(btn);
            return;
        }

        btn.dataset.subject = key;
        if (key === currentSubject) {
            btn.classList.add('active');
            if (key !== 'minecraft') btn.style.backgroundColor = subject.data.color;
            btn.style.color = 'white';
        }
        
        btn.innerHTML = `${subject.data.icon} ${subject.data.name}`;
        btn.style.borderColor = subject.data.color;
        btn.onclick = () => switchSubject(key);
        container.appendChild(btn);
    });
}

// ======================= THEME =======================

function toggleTheme() {
    state.darkMode = !state.darkMode;
    applyTheme();
    saveState();
}

function applyTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('theme-btn');
    html.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    
    if (state.darkMode) {
        if (btn) btn.textContent = '☀️';
    } else {
        if (btn) btn.textContent = '🌙';
    }
}

// ======================= NAVIGATION =======================

function showPanel(id) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    
    // Finde den Tab der geklickt wurde oder den ersten passenden
    const tabs = document.querySelectorAll('.nav-tab');
    let activeTab = null;
    
    // Suche nach Tab mit onclick Attribut das id enthält
    tabs.forEach(tab => {
        const onclick = tab.getAttribute('onclick');
        if (onclick && onclick.includes(`'${id}'`)) {
            activeTab = tab;
        }
    });
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    if (id === 'dashboard') renderDashboard();
    if (id === 'stats') renderStats();
    if (id === 'badges') renderBadges();
}

function toggleSettingsDropdown(event) {
    if (event) event.stopPropagation();
    const dropdown = document.getElementById('settings-dropdown');
    const gearBtn = document.querySelector('.dropdown-wrapper .theme-toggle');
    
    const isOpen = dropdown.classList.toggle('show');
    gearBtn.classList.toggle('active', isOpen);
}

// Schließt das Dropdown, wenn man außerhalb klickt
window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('settings-dropdown');
    const gearBtn = document.querySelector('.dropdown-wrapper .theme-toggle');
    
    if (dropdown && dropdown.classList.contains('show') && !dropdown.contains(e.target) && e.target !== gearBtn) {
        dropdown.classList.remove('show');
        gearBtn.classList.remove('active');
    }
});

// ======================= DASHBOARD =======================

function renderDashboard() {
    const grid = document.getElementById('category-grid');
    if (!grid) return;
    
    // Animation auslösen
    grid.classList.remove('animate-fade-in');
    void grid.offsetWidth; // Trick, um die Animation bei jedem Aufruf neu zu starten
    grid.classList.add('animate-fade-in');

    // Validierung: Prüfe ob Daten existieren
    if (!currentSubjectData || !currentSubjectData.categories) {
        console.error('Keine Kategorien gefunden für:', currentSubject);
        grid.innerHTML = '<p style="text-align: center; color: var(--error);">Fehler: Keine Kategorien gefunden.</p>';
        return;
    }
    
    const subjectAbbr = subjectRegistry[currentSubject]?.abbr || '';
    grid.innerHTML = '';

    // Berechnung der freigeschalteten Fragen pro Kategorie für Minecraft
    let unlockedPerCategory = {};
    if (currentSubject === 'minecraft' && state.unlockedIndices) {
        state.unlockedIndices.forEach(id => {
            const [cat] = id.split(':');
            unlockedPerCategory[cat] = (unlockedPerCategory[cat] || 0) + 1;
        });
    }

    // Minecraft Fortschritt oben anzeigen
    if (currentSubject === 'minecraft') {
        const status = getMinecraftStatus();
        const progressCard = document.createElement('div');
        progressCard.style.cssText = "grid-column: 1 / -1; background: var(--card-bg); padding: 20px; border-radius: 12px; margin-bottom: 10px; border: 2px solid #4e7d1d; text-align: center;";
        progressCard.innerHTML = `
            <div style="font-weight: bold; color: #4e7d1d; margin-bottom: 10px; font-size: 1.1em;">⛏️ Minecraft Belohnungs-System</div>
            <div style="font-size: 1.3em; font-weight: bold; margin-bottom: 5px;">${status.unlockedCount} / ${status.totalPossible} Fragen freigeschaltet</div>
            <div class="progress-bar" style="height: 12px; background: #2c3e50;">
                <div class="progress-fill high" style="width: ${status.percent}%; background: #4e7d1d;"></div>
            </div>
            <div style="font-size: 0.85em; margin-top: 10px; opacity: 0.8;">
                Du erhältst 1 neue Minecraft-Frage für je ${Math.floor(status.questionsPerUnlock)} beantwortete Fragen in den Schulfächern!<br>
                (Aktueller Bonus: +${status.unlockedCount} Fragen)
            </div>
        `;
        grid.appendChild(progressCard);
    }
    
    // 1. Gemischter Modus Karte erstellen und voranstellen
    const mixedCard = document.createElement('div');
    mixedCard.className = 'tense-card';
    mixedCard.style.borderLeft = `4px solid var(--primary-color)`;
    mixedCard.style.background = `rgba(var(--primary-rgb), 0.05)`; // Subtiler Highlight
    mixedCard.innerHTML = `
        <div class="vocab-icon">🎲</div>
        <h3>[${subjectAbbr}] Gemischt</h3>
        <div class="tense-desc">Alle Themen durcheinander üben</div>
        <div class="progress-section">
            <div class="progress-header">
                <span>Bereit für alles?</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill high" style="width: 100%"></div>
            </div>
        </div>
    `;
    mixedCard.onclick = () => startMixedSession();
    grid.appendChild(mixedCard);

    // 2. Kategorien hinzufügen
    Object.entries(currentSubjectData.categories).forEach(([key, category]) => {
        const stats = state.categories[key] || { correct: 0, total: 0 };
        const rate = stats.total > 0 ? Math.round(stats.correct / stats.total * 100) : 0;
        
        let accuracyClass = 'low';
        let badgeClass = 'neutral';
        let badgeText = 'Neu';
        
        if (stats.total >= 5) {
            if (rate >= 80) { accuracyClass = 'high'; badgeClass = 'mastered'; badgeText = 'Meister!'; }
            else if (rate >= 60) { accuracyClass = 'mid'; badgeClass = 'neutral'; badgeText = 'OK'; }
            else { accuracyClass = 'low'; badgeClass = 'practice'; badgeText = 'Üben!'; }
        }
        
        const unlockedInThisCat = unlockedPerCategory[key] || 0;
        const isCategoryLocked = currentSubject === 'minecraft' && (unlockedInThisCat || 0) === 0;

        const card = document.createElement('div');
        card.className = 'tense-card';
        if (isCategoryLocked) {
            card.style.opacity = '0.6';
            card.style.filter = 'grayscale(0.5)';
            card.title = "Noch keine Fragen in dieser Kategorie freigeschaltet.";
        }
        card.style.borderLeft = `4px solid ${category.color}`;

        let unlockedDisplay = "";
        if (currentSubject === 'minecraft') {
            unlockedDisplay = `<div style="font-size: 0.85em; margin-bottom: 8px; font-weight: bold; color: ${isCategoryLocked ? 'var(--text-color)' : 'var(--success)'}">
                ${isCategoryLocked ? '🔒 Noch gesperrt' : `🔓 Freigeschaltet: ${unlockedInThisCat} / ${currentSubjectData.questions[key].length}`}
            </div>`;
        }

        card.innerHTML = `
            <div class="vocab-icon">${category.icon}</div>
            <h3>[${subjectAbbr}] ${category.name}</h3>
            <div class="tense-desc">${category.desc}</div>
            ${unlockedDisplay}
            <div class="progress-section">
                <div class="progress-header">
                    <span>Genauigkeit</span>
                    <span>${rate}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill ${accuracyClass}" style="width: ${rate}%"></div>
                </div>
            </div>
            <div class="tense-stats" style="margin-top: 10px;">
                <div class="tense-accuracy ${accuracyClass}">${stats.correct}/${stats.total}</div>
                <div class="tense-badge ${badgeClass}">${badgeText}</div>
            </div>
        `;
        card.onclick = () => startCategorySession(key);
        card.onclick = () => {
            if (isCategoryLocked) {
                alert("Lerne erst in anderen Fächern weiter, um Fragen in dieser Minecraft-Kategorie freizuschalten!");
                return;
            }
            startCategorySession(key);
        };
        grid.appendChild(card);
    });
    
    updateStatsBar();
}

function startCategorySession(categoryKey) {
    state.currentCategory = categoryKey;
    state.sessionCount = 0;
    showPanel('learn-active');
    nextQuestion();
}

function startMixedSession() {
    state.currentCategory = null;
    state.sessionCount = 0;
    showPanel('learn-active');
    nextQuestion();
}

function endSession() {
    clearTimeout(hintTimer);
    state.currentCategory = null;
    state.difficultyFilter = null;
    state.sessionCount = 0;
    showPanel('dashboard');
    saveState();
}

// ======================= FRAGEN =======================

function nextQuestion() {
    answered = false;
    document.getElementById('feedback-area').classList.remove('show');
    document.getElementById('next-btn').classList.add('hidden');
    
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
        skipBtn.classList.toggle('hidden', !state.showSkipButton);
    }

    clearTimeout(hintTimer);
    
    // Sitzungs-Zähler erhöhen
    state.sessionCount++;
    
    // Validierung: Prüfe ob Daten existieren
    if (!currentSubjectData || !currentSubjectData.questions) {
        console.error('Keine Fragen gefunden für:', currentSubject);
        document.getElementById('question-text').textContent = 'Fehler: Keine Fragen gefunden.';
        return;
    }
    
    let pool = [];
    
    if (state.currentCategory) {
        // Bestimmte Kategorie
        const questions = currentSubjectData.questions[state.currentCategory];
        if (questions && questions.length > 0) {
            questions.forEach((q, idx) => {
                pool.push({ category: state.currentCategory, index: idx, data: q });
            });
        }
    } else {
        // Gemischter Modus - alle Kategorien
        Object.entries(currentSubjectData.questions || {}).forEach(([catKey, questions]) => {
            questions.forEach((q, idx) => {
                pool.push({ category: catKey, index: idx, data: q });
            });
        });
    }

    // MINECRAFT SPEZIAL: Pool auf freigeschaltete Fragen begrenzen
    if (currentSubject === 'minecraft') {
        const status = getMinecraftStatus();
        
        // Nutze die im State gespeicherten zufälligen IDs
        const unlockedIDs = state.unlockedIndices || [];
        
        pool = pool.filter(q => unlockedIDs.includes(`${q.category}:${q.index}`));
        
        if (pool.length === 0) {
            alert("Du hast noch keine Fragen für Minecraft freigeschaltet. Lerne erst in den anderen Fächern weiter!");
            endSession();
            return;
        }
    }

    if (pool.length === 0) return;

    let questionObj;
    if (state.smartMode) {
        // SMART MODE: Gewichtete Auswahl
        let weightedPool = [];
        pool.forEach(q => {
            const stats = state.questionStats[q.category]?.[q.index] || { correct: 0, total: 0 };
            const rate = stats.total > 0 ? (stats.correct / stats.total) : 0;
            
            let weight = 10; // Basis-Gewicht für neue Fragen
            if (stats.total > 0) {
                if (rate < 0.5) weight = 20; // Schwache Fragen doppelt so oft
                else if (rate > 0.8) weight = 2;  // Beherrschte Fragen selten
                else weight = 10;
            }

            // Füge die Frage entsprechend ihrem Gewicht mehrfach in den Pool ein
            for (let i = 0; i < weight; i++) {
                weightedPool.push(q);
            }
        });
        questionObj = weightedPool.length > 0 ? weightedPool[Math.floor(Math.random() * weightedPool.length)] : null;
    } else {
        // Normaler Zufall
        questionObj = pool[Math.floor(Math.random() * pool.length)];
    }


    if (!questionObj) {
        console.error('Keine Frage gefunden!');
        return;
    }
    
    currentQuestion = questionObj;
    renderQuestion();
}

function renderQuestion() {
    const data = currentQuestion.data;
    const category = currentSubjectData.categories[currentQuestion.category];
    const subjectAbbr = subjectRegistry[currentSubject]?.abbr || '';
    
    let tagText = `[${subjectAbbr}] ${category.name}`;
    if (state.difficultyFilter) tagText += ` (Filter: ${state.difficultyFilter})`;
    
    document.getElementById('question-tag').textContent = tagText;
    document.getElementById('question-tag').style.background = category.color + '20';
    document.getElementById('question-tag').style.color = category.color;
    
    // Sitzungsfortschritt anzeigen
    const progressFill = document.getElementById('session-progress-fill');
    if (progressFill) {
        const percent = Math.min((state.sessionCount / 10) * 100, 100);
        progressFill.style.width = `${percent}%`;
    }

    document.getElementById('question-text').textContent = data.question || data.de || 'Frage';
    
    const contextEl = document.getElementById('question-context');
    if (data.hint) {
        contextEl.innerHTML = `<div class="hint-icon" title="Hinweis anzeigen">💡</div><div class="hint-text">${data.hint}</div>`;
        contextEl.classList.remove('hidden');

        // Timer starten: Nach 10 Sekunden wackeln
        hintTimer = setTimeout(() => {
            const icon = contextEl.querySelector('.hint-icon');
            if (icon) icon.classList.add('wobble');
        }, 10000);
    } else {
        contextEl.classList.add('hidden');
    }
    
    // Antwortmöglichkeiten
    const options = data.answers || [data.en];
    const correct = data.correct !== undefined ? data.answers[data.correct] : data.en;
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(btn, opt, correct);
        grid.appendChild(btn);
    });
}

function checkAnswer(el, selected, correct) {
    if (answered) return;
    answered = true;
    clearTimeout(hintTimer);
    
    const isCorrect = selected === correct;
    const fb = document.getElementById('feedback-area');
    const title = document.getElementById('feedback-title');
    const text = document.getElementById('feedback-text');
    
    // Update Stats
    const catStats = state.categories[currentQuestion.category] || { correct: 0, total: 0 };
    catStats.total = (catStats.total || 0) + 1;
    state.categories[currentQuestion.category] = catStats;
    
    state.total++;

    // Update individuelle Fragen-Statistik im Daten-Objekt
    const qStats = currentSubjectData.questions[currentQuestion.category][currentQuestion.index].stats;
    if (qStats) {
        qStats.total++;
        if (isCorrect) qStats.correct++;
    }
    
    if (isCorrect) {
        catStats.correct = (catStats.correct || 0) + 1;
        state.correct++;
        state.streak++;
        
        const basePoints = 10;
        const streakBonus = Math.min(state.streak, 10);
        const points = basePoints + streakBonus;
        state.points += points;
        
        if (state.streak > state.maxStreak) state.maxStreak = state.streak;
        
        el.classList.add('correct');
        
        fb.className = 'feedback-area show correct';
        title.textContent = '✅ Richtig!';
        text.textContent = `+${points} Punkte (${basePoints} + ${streakBonus} Streak-Bonus)`;
        
        if (state.confetti) createConfetti();
    } else {
        el.classList.add('wrong');
        state.streak = 0;
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.textContent === correct) btn.classList.add('correct');
        });
        
        fb.className = 'feedback-area show wrong';
        title.textContent = '❌ Fast!';
        text.innerHTML = `Richtig: <strong>${correct}</strong>`;
    }
    
    document.querySelectorAll('.option-btn').forEach(b => b.classList.add('disabled'));
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('skip-btn')?.classList.add('hidden');
    
    updateStatsBar();
    saveState();
}

// ======================= NAVIGATION & FILTER =======================

function startDifficultySession(diff) {
    state.currentCategory = null;
    state.difficultyFilter = diff;
    state.sessionCount = 0;
    showPanel('learn-active');
    nextQuestion();
}

function skipQuestion() {
    // Überspringen zählt nicht als Antwort (keine Punkte, keine Stats)
    nextQuestion();
}

// ======================= TOGGLES =======================

function toggleSmart() {
    state.smartMode = !state.smartMode;
    document.querySelectorAll('#toggle-smart, #toggle-smart2').forEach(t => {
        t.classList.toggle('active', state.smartMode);
    });
    saveState();
}

function toggleConfetti() {
    state.confetti = !state.confetti;
    document.getElementById('toggle-confetti').classList.toggle('active', state.confetti);
    saveState();
}

function toggleSkipButton() {
    state.showSkipButton = !state.showSkipButton;
    document.getElementById('toggle-skip').classList.toggle('active', state.showSkipButton);
    saveState();
}

// ======================= EXPORT / IMPORT =======================

function exportProgress() {
    const exportData = {
        global: {
            darkMode: state.darkMode,
            grade: state.grade,
            currentSubject: currentSubject,
            showSkipButton: state.showSkipButton,
            // Weitere globale Einstellungen hier hinzufügen
        },
        subjects: {}
    };

    // Alle lernapp_ Einträge aus dem localStorage sammeln
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('lernapp_') && !key.startsWith('lernapp_darkMode') && !key.startsWith('lernapp_grade') && !key.startsWith('lernapp_currentSubject')) {
            try {
                exportData.subjects[key] = JSON.parse(localStorage.getItem(key));
            } catch (e) {
                console.error(`Fehler beim Parsen von localStorage Key ${key}:`, e);
            }
        }
    }

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'lernapp_progress.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Lernfortschritt erfolgreich exportiert als lernapp_progress.json!');
}

function importProgress(event) {
    if (!confirm('Möchtest du deinen Lernfortschritt importieren? Dein aktueller Fortschritt wird dabei überschrieben.')) {
        // Reset file input to allow re-selection of the same file if user cancels
        event.target.value = '';
        return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData.global && importedData.subjects) {
                // Bestehende lernapp_ Einträge löschen, um Konflikte zu vermeiden
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key.startsWith('lernapp_')) localStorage.removeItem(key);
                }

                // Globale Einstellungen importieren
                localStorage.setItem('lernapp_darkMode', importedData.global.darkMode);
                localStorage.setItem('lernapp_grade', importedData.global.grade);
                localStorage.setItem('lernapp_currentSubject', importedData.global.currentSubject);
                localStorage.setItem('lernapp_showSkipButton', importedData.global.showSkipButton);

                // Fachspezifische Daten importieren
                Object.entries(importedData.subjects).forEach(([key, data]) => {
                    localStorage.setItem(key, JSON.stringify(data));
                });

                alert('Lernfortschritt erfolgreich importiert! Die App wird neu geladen.');
                location.reload(); // App neu laden, um den neuen State zu initialisieren
            } else {
                alert('Fehler: Ungültiges Import-Dateiformat. Die Datei muss "global" und "subjects" enthalten.');
            }
        } catch (error) {
            alert('Fehler beim Lesen oder Parsen der Datei: ' + error.message);
        } finally {
            // Reset file input
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}

// ======================= STATS =======================

/**
 * Berechnet die aggregierten Statistiken für eine bestimmte Klassenstufe
 */
function getGradeSummary(grade) {
    let summary = { points: 0, correct: 0, total: 0, subjectsPlayed: 0, subjectsMastered: 0, totalSubjects: 0 };
    Object.entries(subjectRegistry).forEach(([key, subject]) => {
        if (subject.grade === grade) {
            summary.totalSubjects++;
            let data = null;
            
            if (key === currentSubject) {
                data = state;
            } else {
                const saved = localStorage.getItem(`lernapp_${key}`);
                if (saved) {
                    try { data = JSON.parse(saved); } catch(e) {}
                }
            }

            if (data && data.total > 0) {
                summary.points += data.points || 0;
                summary.correct += data.correct || 0;
                summary.total += data.total || 0;
                summary.subjectsPlayed++;
                
                const rate = data.correct / data.total;
                // Meister-Status: >= 80% Quote bei mindestens 10 beantworteten Fragen
                if (rate >= 0.8 && data.total >= 10) {
                    summary.subjectsMastered++;
                }
            }
        }
    });
    summary.isMastered = summary.subjectsMastered === summary.totalSubjects && summary.totalSubjects > 0;
    return summary;
}

function renderStats() {
    const container = document.getElementById('stats-content');
    if (!container) return;
    
    // Validierung: Prüfe ob Daten existieren
    if (!currentSubjectData || !currentSubjectData.categories) {
        container.innerHTML = '<p style="text-align: center; color: var(--error);">Fehler: Keine Daten gefunden.</p>';
        return;
    }
    
    const rate = state.total > 0 ? Math.round(state.correct / state.total * 100) : 0;

    // Zusammenfassung für beide Klassenstufen berechnen
    const grade6 = getGradeSummary('6r');
    const grade8 = getGradeSummary('8g');
    
    // Timeout nutzen, damit das DOM für badges-grid bereit ist
    setTimeout(() => renderBadges(), 0);

    // Schwierigkeits-Verteilung berechnen
    let dist = { easy: 0, medium: 0, hard: 0, unplayed: 0, totalCount: 0 };
    
    Object.entries(currentSubjectData.questions).forEach(([catKey, questions]) => {
        questions.forEach((q, idx) => {
            dist.totalCount++;
            const stats = state.questionStats[catKey]?.[idx] || { correct: 0, total: 0 };
            
            if (stats.total === 0) {
                dist.unplayed++;
            } else {
                const r = stats.correct / stats.total;
                if (r > 0.8) dist.easy++;
                else if (r >= 0.5) dist.medium++;
                else dist.hard++;
            }
        });
    });

    // Problem-Fragen (Top 5 schlechteste Quote)
    let allAttemptedQuestions = [];
    Object.entries(currentSubjectData.questions).forEach(([catKey, questions]) => {
        questions.forEach((q, idx) => {
            const qStat = state.questionStats[catKey]?.[idx] || { correct: 0, total: 0 };
            if (qStat.total > 0) {
                allAttemptedQuestions.push({
                    text: q.question || q.de || 'Frage',
                    catName: currentSubjectData.categories[catKey].name,
                    correct: qStat.correct,
                    total: qStat.total,
                    rate: (qStat.correct / qStat.total) * 100
                });
            }
        });
    });

    const problemQuestions = allAttemptedQuestions
        .sort((a, b) => a.rate - b.rate || b.total - a.total)
        .slice(0, 5);

    const getPerc = (val) => (val / dist.totalCount * 100).toFixed(1);
    
    let html = `
        <!-- Übersicht der Klassenstufen -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px;">
            <div class="stat-card ${grade6.isMastered ? 'mastery-glow' : ''}" style="border-top: 4px solid var(--success); text-align: left; padding: 15px; position: relative;">
                ${grade6.isMastered ? '<div style="position: absolute; top: -10px; right: -10px; font-size: 1.5em;">👑</div>' : ''}
                <div style="font-weight: bold; margin-bottom: 5px; opacity: 0.7; font-size: 0.85em;">
                    📚 6. Klasse Realschule ${grade6.isMastered ? '<span style="color: var(--success)">- GEMEISTERT!</span>' : ''}
                </div>
                <div style="font-size: 1.5em; color: var(--primary-color); font-weight: bold;">${grade6.points} <span style="font-size: 0.6em; opacity: 0.6; font-weight: normal;">Punkte</span></div>
                <div style="font-size: 0.85em; margin-top: 5px;">Richtig: <strong>${grade6.correct}</strong> / ${grade6.total}</div>
                <div style="font-size: 0.75em; opacity: 0.6;">Meister-Fächer: ${grade6.subjectsMastered} / ${grade6.totalSubjects}</div>
            </div>
            <div class="stat-card ${grade8.isMastered ? 'mastery-glow' : ''}" style="border-top: 4px solid var(--secondary-color); text-align: left; padding: 15px; position: relative;">
                ${grade8.isMastered ? '<div style="position: absolute; top: -10px; right: -10px; font-size: 1.5em;">👑</div>' : ''}
                <div style="font-weight: bold; margin-bottom: 5px; opacity: 0.7; font-size: 0.85em;">
                    🎓 8. Klasse Gymnasium ${grade8.isMastered ? '<span style="color: var(--secondary-color)">- GEMEISTERT!</span>' : ''}
                </div>
                <div style="font-size: 1.5em; color: var(--primary-color); font-weight: bold;">${grade8.points} <span style="font-size: 0.6em; opacity: 0.6; font-weight: normal;">Punkte</span></div>
                <div style="font-size: 0.85em; margin-top: 5px;">Richtig: <strong>${grade8.correct}</strong> / ${grade8.total}</div>
                <div style="font-size: 0.75em; opacity: 0.6;">Meister-Fächer: ${grade8.subjectsMastered} / ${grade8.totalSubjects}</div>
            </div>
        </div>

        <h3 style="margin: 25px 0 15px;">🏆 Erfolge</h3>
        <div id="badges-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; margin-bottom: 30px;"></div>

        <h3 style="margin-bottom: 15px; border-bottom: 1px solid var(--border-color); padding-bottom: 5px;">Details: ${currentSubjectData.name}</h3>

        <div class="stat-card" style="margin-bottom: 20px;">
            <div style="font-size: 1.2em; margin-bottom: 10px;">📊 Gesamtbilanz - ${currentSubjectData.name}</div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                <div><div style="font-size: 1.5em; font-weight: bold; color: var(--primary-color)">${state.total}</div><div style="font-size: 0.85em; color: var(--text-light)">Antworten</div></div>
                <div><div style="font-size: 1.5em; font-weight: bold; color: var(--success)">${state.correct}</div><div style="font-size: 0.85em; color: var(--text-light)">Richtig</div></div>
                <div><div style="font-size: 1.5em; font-weight: bold; color: var(--warning)">${rate}%</div><div style="font-size: 0.85em; color: var(--text-light)">Quote</div></div>
            </div>

            <div class="dist-container">
                <div style="font-size: 0.9em; margin-bottom: 10px; font-weight: bold;">Fragen-Verteilung</div>
                <div class="dist-bar">
                    <div class="dist-segment hard" style="width: ${getPerc(dist.hard)}%" title="Schwer üben" onclick="startDifficultySession('hard')"></div>
                    <div class="dist-segment medium" style="width: ${getPerc(dist.medium)}%" title="Mittel üben" onclick="startDifficultySession('medium')"></div>
                    <div class="dist-segment easy" style="width: ${getPerc(dist.easy)}%" title="Leicht üben" onclick="startDifficultySession('easy')"></div>
                    <div class="dist-segment unplayed" style="width: ${getPerc(dist.unplayed)}%" title="Neue Fragen üben" onclick="startDifficultySession('unplayed')"></div>
                </div>
                <div class="dist-legend">
                    <div class="dist-legend-item">
                        <span class="dot" style="background: var(--error)"></span>
                        <span>Schwer (< 50%): ${dist.hard}</span>
                    </div>
                    <div class="dist-legend-item">
                        <span class="dot" style="background: var(--warning)"></span>
                        <span>Mittel (50-80%): ${dist.medium}</span>
                    </div>
                    <div class="dist-legend-item">
                        <span class="dot" style="background: var(--success)"></span>
                        <span>Leicht (> 80%): ${dist.easy}</span>
                    </div>
                    <div class="dist-legend-item">
                        <span class="dot" style="background: #94a3b8"></span>
                        <span>Neu (0 Versuche): ${dist.unplayed}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    if (problemQuestions.length > 0) {
        html += `
            <h3 style="margin: 25px 0 15px;">⚠️ Top 5 Problemfragen</h3>
            <div class="stat-card" style="padding: 10px; margin-bottom: 20px;">
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${problemQuestions.map(q => `
                        <div style="padding: 10px; background: rgba(var(--error-rgb), 0.05); border-radius: 8px; border-left: 3px solid var(--error); display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                            <div style="flex: 1; text-align: left;">
                                <div style="font-size: 0.9em; font-weight: bold;">${q.text}</div>
                                <div style="font-size: 0.75em; opacity: 0.7;">Kategorie: ${q.catName}</div>
                            </div>
                            <div style="text-align: right; min-width: 80px;">
                                <div style="font-weight: bold; color: var(--error);">${Math.round(q.rate)}%</div>
                                <div style="font-size: 0.7em; opacity: 0.6;">(${q.correct}/${q.total} richtig)</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    html += '<h3 style="margin: 25px 0 15px;">Nach Kategorie</h3>';
    
    Object.entries(currentSubjectData.categories).forEach(([key, category]) => {
        const stats = state.categories[key] || { correct: 0, total: 0 };
        const cRate = stats.total > 0 ? Math.round(stats.correct / stats.total * 100) : 0;
        
        html += `
            <div style="background: var(--card-hover); padding: 15px; border-radius: 12px; margin-bottom: 12px; border-left: 4px solid ${category.color}">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <div>
                        <strong>${category.name}</strong>
                    </div>
                    <span style="color: ${category.color}; font-weight: bold;">${cRate}%</span>
                </div>
                <div style="font-size: 0.85em; color: var(--text-light);">${stats.correct}/${stats.total} richtig</div>
            </div>
        `;
    });

    // Kontakt & Datenschutz
    html += `
        <div style="margin-top: 40px; padding: 20px; border-top: 1px solid var(--border-color); font-size: 0.85em; text-align: left; line-height: 1.6; opacity: 0.9;">
            <h3 style="margin-bottom: 10px;">📩 Kontakt & Datenschutz</h3>
            
            <p><strong>Kontakt</strong><br>
            Bei Fragen oder Anregungen wende dich an:<br>
            Alias: Flux78<br>
            E-Mail: <a href="mailto:flux78.ferry499@silomails.com" style="color: var(--primary-color);">flux78.ferry499@silomails.com</a></p>

            <p style="margin-top: 15px;"><strong>Datenschutzerklärung</strong><br>
            Diese Anwendung ist eine rein clientseitige Web-App. Es werden <strong>keine personenbezogenen Daten auf einem Server gespeichert oder erhoben</strong>. 
            Sämtliche Lernfortschritte, Statistiken und Einstellungen werden ausschließlich lokal in deinem Browser (Web Storage) gespeichert.</p>

            <p><strong>Zweck der Datenspeicherung</strong><br>
            Die lokale Speicherung dient einzig dem Zweck, deinen Lernstand (Punkte, Badges, beantwortete Fragen) über verschiedene Sitzungen hinweg zu erhalten und das adaptive Lernen ("Smart Mode") zu ermöglichen.</p>

            <p><strong>Zustimmung</strong><br>
            Durch die Nutzung dieser App erklärst du dich mit der lokalen Speicherung deiner Lernfortschritte einverstanden. Du kannst diese Daten jederzeit in den Einstellungen über "Fortschritt zurücksetzen" löschen.</p>
            
            <div style="margin-top: 20px; font-size: 0.8em; opacity: 0.7; text-align: center;">
                <p>Inhalte basieren auf dem bayerischen Lehrplan (6R / 8G).<br>
                Hintergrundbilder von <a href="https://unsplash.com" target="_blank" style="color: var(--primary-color);">Unsplash</a>.<br>
                Keine Gewähr für die Richtigkeit der Inhalte.</p>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ======================= BADGES =======================

function renderBadges() {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;

    // Berechne globale Statistiken für fachübergreifende Erfolge
    let globalStats = { points: 0, correct: 0, total: 0, maxStreak: state.maxStreak };
    Object.entries(subjectRegistry).forEach(([key, subject]) => {
        let data = null;
        if (key === currentSubject) {
            data = state;
        } else {
            const saved = localStorage.getItem(`lernapp_${key}`);
            if (saved) {
                try { data = JSON.parse(saved); } catch(e) {}
            }
        }
        if (data) {
            globalStats.points += data.points || 0;
            globalStats.correct += data.correct || 0;
            globalStats.total += data.total || 0;
            globalStats.maxStreak = Math.max(globalStats.maxStreak, data.maxStreak || 0);
        }
    });
    
    const badges = [
        { id: 'first_correct', name: 'Erster Erfolg', emoji: '🎯', desc: 'Erste richtige Antwort (gesamt)', req: () => globalStats.correct >= 1 },
        { id: 'streak_5', name: 'Hot Streak', emoji: '🔥', desc: 'Bestleistung von 5 richtigen in Folge', req: () => globalStats.maxStreak >= 5 },
        { id: 'streak_10', name: 'Unaufhaltsam', emoji: '⚡', desc: 'Bestleistung von 10 richtigen in Folge', req: () => globalStats.maxStreak >= 10 },
        { id: 'points_100', name: 'Punktesammler', emoji: '💯', desc: '100 Punkte insgesamt erreicht', req: () => globalStats.points >= 100 },
        { id: 'points_1000', name: 'Lern-Profi', emoji: '🏆', desc: '1.000 Punkte insgesamt erreicht', req: () => globalStats.points >= 1000 },
        { id: 'master_subject', name: 'Fach-Experte', emoji: '📚', desc: '50 richtige Antworten im aktuellen Fach', req: (s) => s.correct >= 50 },
        { id: 'grade_6_master', name: '6. Klasse Champion', emoji: '🎖️', desc: 'Alle Fächer der 6. Klasse > 80%', req: () => getGradeSummary('6r').isMastered },
        { id: 'grade_8_master', name: '8. Klasse Champion', emoji: '🎓', desc: 'Alle Fächer der 8. Klasse > 80%', req: () => getGradeSummary('8g').isMastered }
    ];
    
    grid.innerHTML = '';
    badges.forEach(badge => {
        const unlocked = badge.req(state);
        const div = document.createElement('div');
        div.className = `badge-item ${unlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div class="badge-emoji">${badge.emoji}</div>
            <div class="badge-name">${badge.name}</div>
            <div style="font-size: 0.75em; color: var(--text-light); margin-top: 5px;">${badge.desc}</div>
        `;
        grid.appendChild(div);
    });
}

// ======================= UTILS =======================

function updateStatsBar() {
    document.getElementById('stat-points').textContent = state.points;
    document.getElementById('stat-streak').textContent = state.streak;
    const rate = state.total > 0 ? Math.round(state.correct / state.total * 100) : 0;
    document.getElementById('stat-accuracy').textContent = rate + '%';
    
    const level = Math.floor(state.points / 200) + 1;
    document.getElementById('stat-level').textContent = level;
    
    renderSubjectPointsLegend();
}

function renderSubjectPointsLegend() {
    const container = document.getElementById('subject-points-legend');
    if (!container) return;
    
    container.innerHTML = '';
    Object.entries(subjectRegistry).forEach(([key, subject]) => {
        // Filter: Nur Fächer anzeigen, die zur aktuell gewählten Klassenstufe gehören
        if (!subject.data || subject.grade !== state.grade) return;
        
        let pts = 0;
        // Wenn es das aktuelle Fach ist, nimm die Punkte aus dem State
        if (key === currentSubject) {
            pts = state.points;
        } else {
            // Ansonsten versuche die Punkte aus dem localStorage zu laden
            const saved = localStorage.getItem(`lernapp_${key}`);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    pts = parsed.points || 0;
                } catch(e) {}
            }
        }
        
        const div = document.createElement('div');
        div.className = 'subject-point-item';
        div.title = `${subject.name}: ${pts} Punkte`;
        div.innerHTML = `<span>${subject.data.icon}</span> <strong>${pts}</strong>`;
        container.appendChild(div);
    });
}

function createConfetti() {
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    for (let i = 0; i < 30; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDuration = (2 + Math.random() * 2) + 's';
        c.style.animationDelay = (Math.random() * 0.5) + 's';
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 4000);
    }
}

function resetProgress() {
    if (confirm('Wirklich alle Fortschritte in diesem Fach löschen? Das kann nicht rückgängig gemacht werden.')) {
        // Reset Frage-Stats
        Object.values(currentSubjectData.questions || {}).forEach(questions => {
            questions.forEach(q => {
                q.stats = { correct: 0, total: 0, difficulty: 1.0 };
            });
        });
        
        state = {
            points: 0, streak: 0, maxStreak: 0, total: 0, correct: 0,
            smartMode: true, confetti: true, darkMode: state.darkMode,
            showSkipButton: true, // Reset to default for current subject
            currentMode: 'categories', currentCategory: null,
            categories: {}, answers: [], questionStats: {}, subjectStats: {}
        };
        initializeState();
        saveState();
        updateStatsBar();
        renderDashboard();
        alert('Fortschritt zurückgesetzt!');
    }
}

// ======================= MOBILE OPTIMIERUNG =======================

/**
 * Injiziert responsive Styles und Meta-Tags für eine bessere Nutzung auf Smartphones.
 */
function injectMobileStyles() {
    // Viewport Meta-Tag sicherstellen
    if (!document.querySelector('meta[name="viewport"]')) {
        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.head.appendChild(meta);
    }

    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 600px) {
            :root { --font-size-base: 14px; }
            
            .tense-card { padding: 15px !important; }
            
            /* Antwort-Buttons: Größer für Daumen, mehr Abstand */
            .option-btn { 
                padding: 16px 12px !important; 
                font-size: 1rem !important;
                min-height: 55px;
                margin-bottom: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            #options-grid { 
                grid-template-columns: 1fr !important; 
                gap: 14px !important; /* Schutz vor Missklicks */
            }
            
            #question-text { font-size: 1.2rem !important; line-height: 1.4 !important; }
            
            /* Fach-Umschalter horizontal scrollbar machen */
            #subject-selector {
                display: flex !important;
                overflow-x: auto !important;
                -webkit-overflow-scrolling: touch;
                gap: 8px !important;
                padding: 5px 0 10px 0 !important;
                justify-content: flex-start !important;
                scrollbar-width: none; /* Firefox */
            }
            #subject-selector::-webkit-scrollbar { display: none; } /* Chrome/Safari */
            .subject-btn { flex: 0 0 auto !important; white-space: nowrap !important; font-size: 0.9rem !important; }
            
            .stat-card { padding: 12px !important; }
            .feedback-area { padding: 15px !important; }
        }
    `;
    document.head.appendChild(style);
}

// ======================= INIT =======================

function init() {
    // Zuerst State laden (initialisiert auch die Fach-Daten)
    loadState();
    injectMobileStyles();
    
    renderSubjectSelector();
    updateSubjectUI();
    updateGradeUI();
    updateStatsBar();
    renderDashboard();
    
    document.querySelectorAll('#toggle-smart, #toggle-smart2').forEach(t => {
        t.classList.toggle('active', state.smartMode);
    });
    document.getElementById('toggle-confetti').classList.toggle('active', state.confetti);
    document.getElementById('toggle-skip').classList.toggle('active', state.showSkipButton);
    
    applyTheme();
}

// Starte App wenn DOM bereit
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}