import os
import sys
import json
import re
import argparse

# Pfad zu den Datendateien
SUBJECTS_DIR = 'subjects'

def get_categories(filename):
    filepath = os.path.join(SUBJECTS_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extrahiere Kategorien aus dem 'categories:' Objekt
    split_res = re.split(r'categories:\s*\{', content)
    if len(split_res) < 2:
        return []
    
    content_after_categories = split_res[1]
    
    categories = []
    depth = 0
    
    for line in content_after_categories.splitlines():
        if '{' in line: depth += line.count('{')
        if '}' in line: depth -= line.count('}')
        if depth < 0: break
        
        match = re.search(r'\s+(\w+):\s*\{', line)
        if match:
            categories.append(match.group(1))
            
    return categories

def add_to_file(filename, category, new_questions):
    filepath = os.path.join(SUBJECTS_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    pattern = rf'({category}:\s*\[)(.*?)(\s+\])'
    
    def replacer(match):
        indent = "\n            "
        existing_content = match.group(2).strip()
        
        def format_q(q):
            return f"{{ question: {json.dumps(q['question'], ensure_ascii=False)}, answers: {json.dumps(q['answers'], ensure_ascii=False)}, correct: {q['correct']}, hint: {json.dumps(q['hint'], ensure_ascii=False)}, stats: {{ correct: 0, total: 0, difficulty: 1.0 }} }}"

        new_q_list = [format_q(q) for q in new_questions]
        new_q_str = indent + (",\n" + indent).join(new_q_list)
        
        connector = "," if existing_content else ""
        return f"{match.group(1)}{' ' if existing_content else ''}{existing_content}{connector}{new_q_str}\n        {match.group(3)}"

    new_content = re.sub(pattern, replacer, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

def process_file(filename, count):
    if filename == "run_all.bat": return
    categories = get_categories(filename)
    for cat in categories:
        print(f"python scripts/extend_data.py {filename} {cat} {count} --generate")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Bereite alle Dateiaufrufe vor.")
    parser.add_argument("datei", help="Dateiname oder 'all'")
    parser.add_argument("kategorie", nargs='?', help="Kategorie")
    parser.add_argument("anzahl", type=int, help="Anzahl")
    parser.add_argument("--generate", action="store_true")
    parser.add_argument("--file", help="Datei mit dem JSON")
    
    args = parser.parse_args()
    
    if args.generate:
        print(f"--- FÜGE {args.anzahl} FRAGEN FÜR {args.datei} / {args.kategorie} HINZU ---")
        
        if args.file:
            with open(args.file, 'r', encoding='utf-8') as f:
                new_questions_json = f.read()
        else:
            new_questions_json = sys.stdin.read()
            
        try:
            new_questions = json.loads(new_questions_json)
            add_to_file(args.datei, args.kategorie, new_questions)
            print("Erfolgreich hinzugefügt.")
        except Exception as e:
            print(f"Fehler: {e}")
    elif args.datei == "all":
        for f in os.listdir(SUBJECTS_DIR):
            if f.endswith('.js'):
                process_file(f, args.anzahl)
    else:
        process_file(args.datei, args.anzahl)
