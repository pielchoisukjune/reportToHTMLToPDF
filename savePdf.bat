@echo off
echo ==================================================
echo =           html open and print pdf              =
echo ==================================================

c:										  
cd C:\Program Files (x86)\Google\Chrome\Application\				  
chrome.exe --kiosk-printing %1
