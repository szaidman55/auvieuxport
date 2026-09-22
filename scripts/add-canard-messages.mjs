import fs from 'fs';

const ADD = {
  nl: {
    eyebrow: 'De specialiteit van het huis',
    title: 'Canard à la Rouennaise',
    intro: 'Deels aan tafel bereid, met een authentieke Presse à Canard. De maître versnijdt de eend voor uw ogen en perst het karkas voor de saus.',
    cta: 'Reserveer een tafel',
    preorder: 'Het hele jaar verkrijgbaar. Tijdens het wildseizoen enkel op bestelling.',
    steps: {
      pers: 'De Presse à Canard, aan tafel',
      versnijden: 'De eend wordt versneden',
      saus: 'De saus, uit het karkas geperst',
      bord: 'Het bord, opgediend',
    },
  },
  en: {
    eyebrow: 'The house speciality',
    title: 'Canard à la Rouennaise',
    intro: 'Partly prepared at your table, with an authentic Presse à Canard. The maître carves the duck in front of you and presses the carcass for the sauce.',
    cta: 'Book a table',
    preorder: 'Available all year round. During the game season by advance order only.',
    steps: {
      pers: 'The Presse à Canard, at the table',
      versnijden: 'The duck is carved',
      saus: 'The sauce, pressed from the carcass',
      bord: 'The plate, served',
    },
  },
  fr: {
    eyebrow: 'La spécialité de la maison',
    title: 'Canard à la Rouennaise',
    intro: "Préparé en partie à votre table, avec une authentique Presse à Canard. Le maître découpe le canard sous vos yeux et presse la carcasse pour la sauce.",
    cta: 'Réserver une table',
    preorder: "Disponible toute l'année. Uniquement sur commande pendant la saison du gibier.",
    steps: {
      pers: 'La Presse à Canard, en salle',
      versnijden: 'Le canard est découpé',
      saus: 'La sauce, pressée de la carcasse',
      bord: "L'assiette, servie",
    },
  },
};

for (const [lang, keys] of Object.entries(ADD)) {
  const file = 'src/messages/' + lang + '.json';
  const m = JSON.parse(fs.readFileSync(file, 'utf8'));
  m.canard = { ...(m.canard ?? {}), ...keys };
  fs.writeFileSync(file, JSON.stringify(m, null, 2) + '\n', 'utf8');
  console.log(lang + ' canard: ' + Object.keys(m.canard).join(', '));
}
