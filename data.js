/* Ontwerpkaart Digitaal Toetsen — data.js
   Inhoud afkomstig uit ontwerpkaart_voor_toetsing.xlsx,
   tabbladen 'Dimensies', 'Visueel' en 'Toetsscenario's'. */

const DIMENSIES = [
  {
    id: "sturing", naam: "Sturing", kleur: "#DD784B",
    opties: [
      { id: "docent", label: "Docentgestuurd" },
      { id: "gedeeld", label: "Gedeeld" },
      { id: "student", label: "Studentgestuurd" }
    ]
  },
  {
    id: "niveau", naam: "Cognitief niveau", kleur: "#3D68EC",
    opties: [
      { id: "onthouden", label: "Onthouden" },
      { id: "begrijpen", label: "Begrijpen" },
      { id: "toepassen", label: "Toepassen" },
      { id: "analyseren", label: "Analyseren" },
      { id: "evalueren", label: "Evalueren" },
      { id: "creeren", label: "Creëren" }
    ]
  },
  {
    id: "groep", naam: "Groepsgrootte", kleur: "#00846B",
    opties: [
      { id: "individueel", label: "Individueel" },
      { id: "klein", label: "Kleine groep (2 tot 6)" },
      { id: "groot", label: "Grote groep (klas)" },
      { id: "massaal", label: "Massaal (30+)" }
    ]
  },
  {
    id: "functie", naam: "Functie", kleur: "#B23A55",
    opties: [
      { id: "leer", label: "Leerfunctie" },
      { id: "beslis", label: "Beslisfunctie" },
      { id: "beide", label: "Beide" }
    ]
  }
];

const SCENARIOS = [
  { thema: "Kennisverwerving en begrip", naam: "Kennistoets met directe feedback",
    sturing: ["docent"], niveau: ["onthouden"], groep: ["individueel", "massaal"], functie: ["leer"],
    vormen: ["Online quiz", "Oefentoets", "Kennistoets", "Flashcards"] },
  { thema: "Kennisverwerving en begrip", naam: "Actief kennis verwerken",
    sturing: ["gedeeld"], niveau: ["begrijpen"], groep: ["klein", "groot"], functie: ["leer"],
    vormen: ["Peer instruction", "Conceptmapping", "Groepsquiz", "Uitlegopdracht"] },
  { thema: "Kennisverwerving en begrip", naam: "Schriftelijk kennistentamen",
    sturing: ["docent"], niveau: ["onthouden", "begrijpen"], groep: ["individueel", "massaal"], functie: ["beslis"],
    vormen: ["Meerkeuzetoets", "Openvragentoets", "Digitaal tentamen"] },
  { thema: "Kennisverwerving en begrip", naam: "Mondelinge kennistoets",
    sturing: ["docent", "gedeeld"], niveau: ["begrijpen"], groep: ["individueel"], functie: ["beslis"],
    vormen: ["Mondeling tentamen", "Kennisgesprek", "Mondelinge toelichting"] },
  { thema: "Kennis toepassen en problemen oplossen", naam: "Casusgestuurd leren",
    sturing: ["gedeeld", "student"], niveau: ["toepassen"], groep: ["klein"], functie: ["leer"],
    vormen: ["Casusopdracht", "Probleemgestuurd leren", "Groepsopdracht"] },
  { thema: "Kennis toepassen en problemen oplossen", naam: "Individuele toepassingstoets",
    sturing: ["docent"], niveau: ["toepassen"], groep: ["individueel", "massaal"], functie: ["beslis"],
    vormen: ["Casustoets", "Openvragentoets", "Rekentoets", "Programmeertoets"] },
  { thema: "Kennis toepassen en problemen oplossen", naam: "Praktijkgerichte simulatie",
    sturing: ["docent", "gedeeld"], niveau: ["toepassen"], groep: ["individueel", "klein"], functie: ["beide"],
    vormen: ["Simulatie", "Vaardigheidstoets", "Rollenspel", "Praktijksimulatie"] },
  { thema: "Analyseren en onderzoeken", naam: "Gezamenlijke casusanalyse",
    sturing: ["gedeeld"], niveau: ["analyseren"], groep: ["klein"], functie: ["leer"],
    vormen: ["Groepsanalyse", "Debat", "Casusbespreking", "Peer review"] },
  { thema: "Analyseren en onderzoeken", naam: "Individuele analyseopdracht",
    sturing: ["docent"], niveau: ["analyseren"], groep: ["individueel"], functie: ["beslis"],
    vormen: ["Casusanalyse", "Data-analyse", "Onderzoeksverslag"] },
  { thema: "Analyseren en onderzoeken", naam: "Onderzoeksgericht toetsen",
    sturing: ["student", "gedeeld"], niveau: ["analyseren"], groep: ["individueel", "klein"], functie: ["beide"],
    vormen: ["Onderzoeksopdracht", "Onderzoeksportfolio", "Onderzoeksrapport"] },
  { thema: "Evalueren, beoordelen en reflecteren", naam: "Peerfeedback en zelfevaluatie",
    sturing: ["student", "gedeeld"], niveau: ["evalueren"], groep: ["individueel", "klein"], functie: ["leer"],
    vormen: ["Peer assessment", "Zelfassessment", "Reflectieopdracht"] },
  { thema: "Evalueren, beoordelen en reflecteren", naam: "Kritisch beoordelen en argumenteren",
    sturing: ["docent", "gedeeld"], niveau: ["evalueren"], groep: ["individueel", "klein"], functie: ["beslis"],
    vormen: ["Essay", "Betoog", "Kritisch verslag", "Mondelinge verdediging"] },
  { thema: "Evalueren, beoordelen en reflecteren", naam: "Ontwikkelingsgericht portfolio",
    sturing: ["student"], niveau: ["evalueren"], groep: ["individueel"], functie: ["beide"],
    vormen: ["Portfolio", "Reflectieportfolio", "Ontwikkelportfolio", "Criteriumgericht interview"] },
  { thema: "Creëren en beroepsproducten ontwikkelen", naam: "Ontwerpopdracht met feedback",
    sturing: ["gedeeld", "student"], niveau: ["creeren"], groep: ["individueel", "klein"], functie: ["leer"],
    vormen: ["Ontwerpopdracht", "Prototype", "Creatieve opdracht", "Projectopdracht"] },
  { thema: "Creëren en beroepsproducten ontwikkelen", naam: "Beroepsproduct met verdediging",
    sturing: ["student", "gedeeld"], niveau: ["creeren"], groep: ["individueel", "klein"], functie: ["beslis"],
    vormen: ["Beroepsproduct", "Ontwerpverslag", "Presentatie", "Eindproduct met verdediging"] },
  { thema: "Creëren en beroepsproducten ontwikkelen", naam: "Integraal groepsproject",
    sturing: ["gedeeld"], niveau: ["creeren"], groep: ["klein", "groot"], functie: ["beide"],
    vormen: ["Projectassessment", "Groepsproduct", "Projectportfolio", "Groepspresentatie"] },
  { thema: "Professioneel handelen en integrale bekwaamheid", naam: "Proeve van bekwaamheid",
    sturing: ["docent", "gedeeld"], niveau: ["toepassen", "evalueren"], groep: ["individueel"], functie: ["beslis"],
    vormen: ["Praktijkassessment", "Proeve van bekwaamheid", "OSCE", "Performance assessment"] },
  { thema: "Professioneel handelen en integrale bekwaamheid", naam: "Praktijkleren met bewijsverzameling",
    sturing: ["student", "gedeeld"], niveau: ["toepassen", "analyseren", "evalueren"], groep: ["individueel"], functie: ["beide"],
    vormen: ["Stageassessment", "Praktijkportfolio", "Werkplekbeoordeling", "Programmatisch toetsen"] }
];
