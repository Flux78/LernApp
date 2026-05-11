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
    match = re.search(r'categories:\s*\{([^}]+)\}', content, re.DOTALL)
    if not match:
        return []
    
    # Extrahiere alle Schlüssel aus dem categories-Block
    categories = re.findall(r'\s+(\w+):', match.group(1))
    return categories

def process_file(filename, count):
    categories = get_categories(filename)
    for cat in categories:
        # Hier ist die LLM-Schnittstelle geplant
        print(f"python scripts/extend_data.py {filename} {cat} {count}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Bereite alle Dateiaufrufe vor.")
    parser.add_argument("datei", help="Dateiname oder 'all'")
    parser.add_argument("anzahl", type=int, help="Anzahl der neuen Fragen")
    
    args = parser.parse_args()
    
    if args.datei == "all":
        for f in os.listdir(SUBJECTS_DIR):
            if f.endswith('.js'):
                process_file(f, args.anzahl)
    else:
        process_file(args.datei, args.anzahl)
