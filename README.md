# Produktlista



Beskrivning: 
Detta är ett API-skolprojekt som, med hjälp av ett gränssnitt, visar produkter som finns i en json-fil. Via gränssnittet kan man lägga till, ändra eller ta bort  produkter. Man kan även se mer detaljerad information om en specifik produkt. 

Krav som är uppfyllda:
Projektet innehåller endpoints GET, GET BY ID, POST, PUT & DELETE.

Samtliga endpoints nås via en REST Client fil.

All data är sparad i en JSON-fil.

Datan i JSON-filen uppdateras då något läggs till, uppdateras eller tas bort.

APIét svara med 404 om datan saknas.

Git & GitHub har använts.

Projektmappen innehåller en README.md fil.

Ett klient-gränssnitt är byggt för att anropa API:ets alla olika endpoints och presentera datan. 

Redigeringsformulär fylls i automatiskt med befintlig information.

Hur projektet byggs och körs:
1. Hämta ner repot från github med den här länken via din bash-terminal
-- https://github.com/SaraPellnor/Inl-mningsuppgift-REST-API.git --
2. Öppna mappen i VScode. 
3. Installera paket med:
"npm install" i bashen i VScode.
Om detta inte fungerar, kan du gå in i package.json för att installera alla paket för sig. 
"npm i core"
"nmp i express"
"npm i nodemon"
4. Starta sedan servern genom att skriva in "nodemon server.js" i terminalen. Se så servern körs i terminalen. 
5. Öppna sedan index.html genom att högerklicka och välja "open with liveserver". 
6. Var så god och testa mitt API! 


Den ska innehålla en titel, beskrivning av projektet, vilka krav som är uppfyllda, info om hur projektet byggs och körs.
