# Ontwerpkaart Digitaal Toetsen

Interactieve, statische site (geen backend, geen build) die op basis van vier
dimensies passende toetsscenario's en toetsvormen toont.

## Inhoud
Afkomstig uit `ontwerpkaart_voor_toetsing.xlsx`, tabbladen *Dimensies*,
*Visueel* en *Toetsscenario's*. De overige tabbladen zijn bewust niet gebruikt.

- **Dimensies**: Sturing (3), Cognitief niveau (6), Groepsgrootte (4), Functie (3)
- **Scenario's**: 18, in 5 thema's, elk met toetsvormen

## Werking
- Eén keuze per dimensie; opnieuw klikken heft de keuze op.
- Resultaten verschijnen direct na de eerste keuze, gesorteerd op het aantal
  overeenkomende dimensies (bijv. "3 van 4 dimensies").
- Zwakkere matches staan achter een knop.
- Een scenario met functie *Beide* telt mee bij leer- én beslisfunctie.
- Keuzes zitten in de URL-hash (`#k=docent,begrijpen,individueel,beslis`),
  dus de link is deelbaar. Afdrukken/PDF via de browser.

## Structuur
```
index.html
css/style.css   Npuls-huisstijl (zelfde tokens als de Maturity Scan)
js/data.js      Dimensies en scenario's — hier aanpassen
js/app.js       Matching en weergave
assets/         Zet hier npuls-mark.png (zelfde bestand als Maturity Scan)
```

## GitHub Pages
Repository → Settings → Pages → branch `main`, map `/root` (of `/docs`).
