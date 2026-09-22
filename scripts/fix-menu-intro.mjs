// De intro van de kaart sprak van "dagelijkse suggesties".
//
// Twee keer onjuist geworden. De suggesties zijn de seizoens- of weekkaart,
// niet iets van vandaag. En sinds ze een eigen sectie op de kaart hebben,
// staat er letterlijk boven de lijst dat je ernaar moet vragen aan de zaal.
//
// De zin mag blijven zeggen dat er meer is dan wat gedrukt staat, want dat
// klopt nog altijd. Hij mag alleen geen ritme meer beweren.
import fs from 'fs';

const INTRO = {
  nl: 'Wij werken met dagverse en seizoensgebonden producten. Vraag de zaal gerust naar wat er daarnaast nog is.',
  en: 'We cook with what the season and the market give us. Do ask the floor what else there is.',
  fr: "Nous cuisinons ce que la saison et le marché nous offrent. N'hésitez pas à demander en salle ce qu'il y a d'autre.",
};

for (const [lang, intro] of Object.entries(INTRO)) {
  const file = 'src/messages/' + lang + '.json';
  const m = JSON.parse(fs.readFileSync(file, 'utf8'));
  const before = m.menu.intro;
  m.menu.intro = intro;
  fs.writeFileSync(file, JSON.stringify(m, null, 2) + '\n', 'utf8');
  console.log(lang);
  console.log('  was: ' + before);
  console.log('  nu : ' + intro);
}
