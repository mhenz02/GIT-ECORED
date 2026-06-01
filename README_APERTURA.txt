ECO-RED Strategic Intelligence Platform

Questa cartella contiene tutto il necessario per aprire o caricare il sito:

- index.html
- public/data/        dati JSON statici
- public/assets/      immagini e visual
- public/premium.css  stile grafico premium
- public/premium.js   interazioni, hero, glossary

IMPORTANTE
Non aprire index.html direttamente con doppio click, perche il browser potrebbe bloccare il caricamento dei file JSON.

Metodo consigliato in locale:
1. Apri il terminale dentro questa cartella.
2. Esegui:
   python -m http.server 8765 --bind 127.0.0.1
3. Apri nel browser:
   http://127.0.0.1:8765/

Deploy su Vercel:
Carica direttamente tutta questa cartella come progetto statico.
Non serve database e non serve backend: i dati sono gia dentro public/data.

Se manca qualche dato nel sito, controlla che sia stata caricata anche la cartella public.
