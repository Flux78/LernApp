@echo off
setlocal enabledelayedexpansion

:: Erstelle temporäre Datei für die Liste der Aufrufe
python scripts/extend_data.py all 5 > temp_calls.bat

:: Führe die generierten Aufrufe aus
call temp_calls.bat

:: Aufräumen
del temp_calls.bat
