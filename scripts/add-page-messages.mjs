import fs from 'fs';

const ADD = {
  nl: {
    nav: { about: 'Over ons' },
    menu: {
      friday: 'Voor het diner op vrijdag vragen wij u vriendelijk om minstens twee gangen te bestellen, omdat de tafel de hele avond voor u is.',
      book: 'Reserveer een tafel',
      wineLink: 'Bekijk onze wijnkaart',
      teaser: 'Klassiekers op niveau, met dagverse en seizoensgebonden producten. Van de Tarte au Boudin Basque tot de Canard à la Rouennaise.',
      seeAll: 'Bekijk de hele kaart',
    },
    about: {
      title: 'Over ons',
      lead: "Au Vieux Port is wat men noemt een gevestigde waarde op het Antwerpse Eilandje.",
      p1: 'De zaak bestaat sinds 2007 en staat gekend voor de oerklassieke Franse keuken en haar zaalbereidingen.',
      p2: 'Chef Stijn Havermans brengt er al jaren klassiekers op niveau. Zo krijgt u met de Canard à la Rouennaise een unieke ervaring voorgeschoteld: het gerecht wordt deels aan tafel bereid door maître Tom Schoonbaert, met een authentieke Presse à Canard. Reserveer uw canard op voorhand.',
      p3: "Elk seizoen brengt zijn eigen klassiekers: fazant 'Fine Champagne' in het najaar, hazenrug 'Arlequin' tijdens het wildseizoen. Het hele jaar door vindt u paling in 't groen en een zwartpootkip uit de Landes. En ga niet weg zonder de Tarte au Boudin Basque geproefd te hebben.",
      p4: 'De wijnkaart is het werk van eigenaar en wine director Serge Verboven. Onze sommelier schenkt verschillende wijnen per glas en begeleidt u bij uw keuze. In de kelder vindt u een mooie selectie Bordeaux en Bourgogne, met Italië en Spanje goed vertegenwoordigd. In 2022 bekroonde Wine Spectator de kaart met één glas, sinds 2023 met twee.',
      label: 'Restaurant Au Vieux Port draagt met trots het label "Fine Dining in Antwerp".',
      teamLink: 'Maak kennis met ons team',
      wineLink: 'Bekijk onze wijnkaart',
    },
  },
  en: {
    nav: { about: 'About us' },
    menu: {
      friday: 'For dinner on Friday we kindly ask you to order at least two courses, as the table is yours for the whole evening.',
      book: 'Book a table',
      wineLink: 'View our wine list',
      teaser: 'Classics cooked at this level, with what the season and the market give us. From the Tarte au Boudin Basque to the Canard à la Rouennaise.',
      seeAll: 'See the whole menu',
    },
    about: {
      title: 'About us',
      lead: "Au Vieux Port is an institution on Antwerp's Eilandje.",
      p1: 'The restaurant opened in 2007 and is known for its uncompromisingly classical French cooking and for the dishes it prepares at your table.',
      p2: 'Chef Stijn Havermans has been cooking the classics at this level for years. The Canard à la Rouennaise is an experience you will not find in many places: maître Tom Schoonbaert finishes the dish beside your table, using a genuine Presse à Canard. Please order your canard when you book.',
      p3: "The seasons bring their own classics: pheasant 'Fine Champagne' in autumn, saddle of hare 'Arlequin' in the game months. All year round you will find eel in green herb sauce and black-leg chicken from the Landes. And do not leave without trying the Tarte au Boudin Basque.",
      p4: 'The wine list is the work of owner and wine director Serge Verboven. Our sommelier pours a broad selection by the glass and is happy to guide you through the list. The cellar holds a serious collection of Bordeaux and Burgundy, with Italy and Spain well represented alongside them. Wine Spectator awarded the list one glass in 2022, and two glasses since 2023.',
      label: 'Restaurant Au Vieux Port proudly carries the "Fine Dining in Antwerp" label.',
      teamLink: 'Meet our team',
      wineLink: 'View our wine list',
    },
  },
  fr: {
    nav: { about: 'À propos' },
    menu: {
      friday: 'Pour le dîner du vendredi, nous vous demandons de commander au minimum deux services, la table étant réservée pour vous toute la soirée.',
      book: 'Réserver une table',
      wineLink: 'Voir notre carte des vins',
      teaser: 'Des classiques travaillés à ce niveau, avec ce que la saison et le marché nous donnent. De la Tarte au Boudin Basque au Canard à la Rouennaise.',
      seeAll: 'Voir toute la carte',
    },
    about: {
      title: 'À propos',
      lead: "Au Vieux Port est ce que l'on appelle une valeur sûre sur l'Eilandje, l'ancien quartier des docks d'Anvers.",
      p1: "La maison est ouverte depuis 2007 et s'est fait un nom par sa cuisine française résolument classique et par ses préparations en salle.",
      p2: "Le chef Stijn Havermans travaille les classiques à ce niveau depuis des années. Le Canard à la Rouennaise en est l'exemple le plus marquant : le maître d'hôtel Tom Schoonbaert termine le plat devant vous, à l'aide d'une authentique Presse à Canard. Merci de commander votre canard au moment de la réservation.",
      p3: "Chaque saison apporte ses classiques : le faisan « Fine Champagne » en automne, le râble de lièvre « Arlequin » pendant la saison du gibier. Toute l'année, vous trouverez l'anguille au vert et le poulet pattes noires des Landes. Et ne repartez pas sans avoir goûté la Tarte au Boudin Basque.",
      p4: "La carte des vins est l'œuvre de Serge Verboven, propriétaire et wine director. Notre sommelier sert une large sélection au verre et vous guide volontiers dans vos choix. La cave abrite une belle collection de bordeaux et de bourgognes ; l'Italie et l'Espagne y sont également bien représentées. En 2022, notre carte a été distinguée d'un verre par Wine Spectator, et de deux verres depuis 2023.",
      label: 'Restaurant Au Vieux Port porte fièrement le label « Fine Dining in Antwerp ».',
      teamLink: 'Faites connaissance avec notre équipe',
      wineLink: 'Voir notre carte des vins',
    },
  },
};

for (const [lang, groups] of Object.entries(ADD)) {
  const file = 'src/messages/' + lang + '.json';
  const m = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [ns, keys] of Object.entries(groups)) {
    m[ns] = { ...(m[ns] ?? {}), ...keys };
  }
  fs.writeFileSync(file, JSON.stringify(m, null, 2) + '\n', 'utf8');
  console.log(lang + ': ' + Object.keys(groups).join(', '));
}
