# Välkomna till Oskars (oskan896) och Emils (emigu041) Webbprogrammeringsprojekt!

## Setup

1. Starta MongoDB.
2. Kontrollera att du har alla nödvändiga paket genom att köra `npm install` i både `/server` och `/frontend`-mapparna.

## HTTPS Setup

Denna applikation använder HTTPS, vilket kan vara lite krångligt att sätta upp. Vi har testat det med Firefox, men det borde fungera med andra webbläsare också.

### Firefox Konfiguration

1. Öppna Firefox och gå till inställningarna.
2. Sök efter "certificates".
3. Klicka på "View Certificates".
4. Klicka på "Authorities".
5. Välj "Import" och navigera till `/server/certs`-mappen.
6. Välj filen "server.cert".
7. Markera alternativet för att tillåta identifiering av webbplatser.
8. Starta servern genom att öppna terminalen och gå till `/server`, sedan kör `node server.js`.
9. Öppna Firefox och besök "https://localhost:3443". En varningsskylt kommer att visas.
10. Klicka på "Avancerat" och sedan "Acceptera risken och fortsätt".
11. Du kan nu stänga fliken.

## Starta Applikationen

1. Gå till `/server` och starta servern genom att köra `node server.js`.
2. Gå till `/frontend` och starta frontend-delen genom att köra `npm start`. Om du ombeds välja en annan port, skriv "y". Applikationen bör nu öppnas i Firefox. Om det inte gör det kan du öppna den manuellt genom att besöka "http://localhost:3001".

## Kör Tester

För att köra tester, gå till `/server` och kör följande kommando:

```bash
npm test
```