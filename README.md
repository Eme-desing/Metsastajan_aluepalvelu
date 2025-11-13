# Metsästäjän aluepalvelu

React + Vite -sovellus jossa on 4 näkymää, pääsivu jossa näet metsästysalueet kartalla ( OpenSteetMap ),sivu jossa näkyy alueen metsästysajat, sivu jossa näkee alueen sääennusteen ( Open meteo ),sekä sivu jossa  voit tallentaa myös alueita suosikeiksi

## Asennus
```bash
npm install
npm run dev
```
Avaa kehityspalvelin osoitteessa, jonka Vite tulostaa (esim. http://localhost:5173).

## Kirjastot
- react-router-dom (reititys)
- @tanstack/react-query (API-välimuisti)
- react-leaflet + leaflet (kartta)
- @mui/material (UI)
- axios (HTTP)
- Open-Meteo (sää, ei API-avainta)

## API-kerros
Säätiedot haetaan avoimesta Open-Meteo API -rajapinnasta: https://open-meteo.com

