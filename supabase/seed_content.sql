-- De kaart en het team van Au Vieux Port, zoals het huis ze publiceert.
-- Overgenomen van restaurantauvieuxport.be in alle drie de talen.

-- De secties opnieuw zetten; menu_items hangt eraan met on delete cascade.
delete from menu_items;
delete from menu_sections;

insert into menu_sections (id, title_nl, title_en, title_fr, note_nl, note_en, note_fr, position) values
  ('voorgerechten', 'Voorgerechten', 'Starters', 'Entrées', null, null, null, 10),
  ('hoofdgerechten', 'Hoofdgerechten', 'Main courses', 'Plats', 'Peperroom · Béarnaise · Choron', 'Pepper cream · Béarnaise · Choron', 'Sauce poivre · Béarnaise · Choron', 20),
  ('garnituren', 'Garnituren', 'Sides', 'Garnitures', null, null, null, 30),
  ('specialiteiten', 'Specialiteiten "Au Vieux Port"', '"Au Vieux Port" specialties', 'Spécialités « Au Vieux Port »', 'Canard à la Rouennaise is het hele jaar verkrijgbaar. Tijdens het wildseizoen enkel op bestelling.', 'Canard à la Rouennaise is available all year round. During the game season by advance order only.', 'Le Canard à la Rouennaise est disponible toute l''année, et uniquement sur commande pendant la saison du gibier.', 40),
  ('desserten', 'Desserten', 'Desserts', 'Desserts', null, null, null, 50);

insert into menu_items (section_id, name_nl, name_en, name_fr, price, per_person, requires_preorder, price_note_nl, price_note_en, price_note_fr, position) values
  ('voorgerechten', 'Kaaskroket', 'Cheese croquette', 'Croquette au fromage', 26, false, false, null, null, null, 10),
  ('voorgerechten', 'Carpaccio van Rib-Eye', 'Rib-eye carpaccio', 'Carpaccio de rib-eye', 26, false, false, null, null, null, 20),
  ('voorgerechten', 'Tarte au Boudin Basque', 'Tarte au Boudin Basque', 'Tarte au Boudin Basque', 31, false, false, null, null, null, 30),
  ('voorgerechten', 'Een bereiding met ganzenlever', 'A preparation of foie gras', 'Une préparation de foie gras', 37, false, false, null, null, null, 40),
  ('voorgerechten', 'Huisgerookte zalm', 'House-smoked salmon', 'Saumon fumé maison', 28, false, false, null, null, null, 50),
  ('voorgerechten', 'Oesters', 'Oysters', 'Huîtres', 39, false, false, null, null, null, 60),
  ('hoofdgerechten', 'Steak tartare à la minute', 'Steak tartare à la minute', 'Steak tartare à la minute', 36, false, false, null, null, null, 70),
  ('hoofdgerechten', 'Filet Pur', 'Beef fillet', 'Filet pur', 53, false, false, null, null, null, 80),
  ('hoofdgerechten', 'Entrecôte', 'Entrecôte', 'Entrecôte', 55, false, false, null, null, null, 90),
  ('garnituren', 'Groene salade', 'Green salad', 'Salade verte', 12, false, false, null, null, null, 100),
  ('garnituren', 'Tomaat- en witloofsalade', 'Tomato and chicory salad', 'Salade tomates - chicons', 12, false, false, null, null, null, 110),
  ('garnituren', 'Warme groenten', 'Warm vegetables', 'Légumes chauds', 12, false, false, null, null, null, 120),
  ('specialiteiten', 'Canard à la Rouennaise', 'Canard à la Rouennaise', 'Canard à la Rouennaise', 65, true, true, null, null, null, 130),
  ('specialiteiten', 'Zwartpootkip uit de Landes', 'Black-leg chicken from the Landes', 'Poulet pattes noires des Landes', 45, true, false, null, null, null, 140),
  ('specialiteiten', 'Paling in ''t groen', 'Eel in green herb sauce', 'Anguille au vert', 45, false, false, null, null, null, 150),
  ('specialiteiten', 'Zeetong', 'Dover sole', 'Sole', null, false, false, null, null, null, 160),
  ('desserten', 'Kaas per stuk', 'Cheese, per piece', 'Fromage à la pièce', null, false, false, 'per stuk', 'per piece', 'à la pièce', 170),
  ('desserten', 'Café Glacé', 'Café glacé', 'Café glacé', 13, false, false, null, null, null, 180),
  ('desserten', 'Dame Blanche', 'Dame Blanche', 'Dame blanche', 15, false, false, null, null, null, 190),
  ('desserten', 'Sabayon', 'Sabayon', 'Sabayon', 15, false, false, null, null, null, 200),
  ('desserten', 'Crêpes Suzette met vanille-ijs', 'Crêpes Suzette, vanilla ice cream', 'Crêpes Suzette, glace vanille', 25, false, false, null, null, null, 210),
  ('desserten', 'Moelleux au Chocolat', 'Moelleux au chocolat', 'Moelleux au chocolat', 14, false, false, null, null, null, 220);

-- Het team, met de teksten van de bestaande site.
delete from team_members;
insert into team_members (slug, name, role_nl, role_en, role_fr, bio_nl, bio_en, bio_fr, photo, link_url, link_nl, link_en, link_fr, position) values
  ('stijn-havermans', 'Stijn Havermans', 'Chef · Mastercook of Belgium', 'Chef · Mastercook of Belgium', 'Chef · Mastercook of Belgium', 'Stijn groeide op in een gezin waar goed eten en de momenten samen aan tafel altijd belangrijk waren. Hij was zes toen hij een reportage zag over Paul Haeberlin en diens Auberge de l''Ill. Vanaf toen waren koken en gastronomie zijn passie.

Hij leerde het vak in Stella Maris in Merksem, een school met een sterk klassieke opleiding gericht op à-la-cartekoken, en specialiseerde zich daarna in Ter Duinen. Voor zijn stages koos hij bewust twee keukens die sterk van elkaar verschillen: ''t Fornuis bij Johan Segers en Zilte bij Viki Geunes.

In Au Vieux Port werkte hij vier jaar naast chef Marc Rigouts. Toen die met pensioen ging, nam Stijn de leiding van de keuken over.

Zijn keuken omschrijft hij als klassiek, seizoensgebonden en robuust: een productkeuken, met respect voor de producenten van wie we onze producten krijgen. Hij kijkt op naar chefs met een stevige klassieke basis, zoals Peter Goossens, Luc Broutard, Joseph Viola, Christian Denis en Karen Torosyan.

In 2026 werd Stijn opgenomen in The Mastercooks of Belgium, met Bert Meewis en Viki Geunes als peters. “Een erkenning voor het harde werk, en een grote eer om de Belgische gastronomie te mogen vertegenwoordigen.”', 'Stijn grew up in a family where good food and time spent together at the table always mattered. He was six when he saw a documentary about Paul Haeberlin and his Auberge de l''Ill. From then on, cooking and gastronomy were his passion.

He learned the trade at Stella Maris in Merksem, a school with a strongly classical training focused on à la carte cooking, and then specialised at Ter Duinen. For his internships he deliberately chose two very different kitchens: ''t Fornuis with Johan Segers and Zilte with Viki Geunes.

At Au Vieux Port he spent four years working alongside chef Marc Rigouts. When Marc retired, Stijn took charge of the kitchen.

He describes his cooking as classic, seasonal and robust: a cuisine built on the product, with respect for the producers who supply us. He looks up to chefs with a solid classical foundation, such as Peter Goossens, Luc Broutard, Joseph Viola, Christian Denis and Karen Torosyan.

In 2026 Stijn was admitted to The Mastercooks of Belgium, with Bert Meewis and Viki Geunes as his sponsors. “A recognition of hard work, and a great honour to represent Belgian gastronomy.”', 'Stijn a grandi dans une famille où bien manger et les moments partagés à table ont toujours compté. Il avait six ans lorsqu''il a vu un reportage sur Paul Haeberlin et son Auberge de l''Ill. Depuis, la cuisine et la gastronomie sont sa passion.

Il a appris le métier à Stella Maris, à Merksem, une école à la formation très classique axée sur la cuisine à la carte, puis s''est spécialisé à Ter Duinen. Pour ses stages, il a délibérément choisi deux cuisines très différentes : ''t Fornuis chez Johan Segers et Zilte chez Viki Geunes.

À Au Vieux Port, il a travaillé quatre ans aux côtés du chef Marc Rigouts. Lorsque celui-ci a pris sa retraite, Stijn a repris la direction de la cuisine.

Il décrit sa cuisine comme classique, de saison et généreuse : une cuisine du produit, dans le respect des producteurs qui nous fournissent. Il admire les chefs à la solide base classique, comme Peter Goossens, Luc Broutard, Joseph Viola, Christian Denis et Karen Torosyan.', '/img/team/stijn-havermans.webp', 'https://www.mastercooks.be/', 'Stijn bij The Mastercooks of Belgium', 'Stijn at The Mastercooks of Belgium', 'Stijn chez The Mastercooks of Belgium', 10),
  ('tom-schoonbaert', 'Tom Schoonbaert', 'Maître d''hôtel', 'Maître d''hôtel', 'Maître d''hôtel', 'Tom kwam in 2009 als stagiair naar Au Vieux Port en is nooit meer weggegaan. Vandaag is hij als maître verantwoordelijk voor het goede verloop van elke lunch en elk diner.

Gastvrijheid is zijn handelsmerk. Wie binnenkomt, wordt door Tom met een brede lach ontvangen, en hij zorgt ervoor dat u de hele avond in de watten gelegd wordt.

Zijn grote passie is het versnijden aan tafel. Kip, patrijs, fazant, hazenrug, zeetong, tarbot: Tom versnijdt ze vakkundig, voor uw ogen. Die techniek, ook die van onze Canard à la Rouennaise, heeft hij doorgegeven aan het hele zaalteam. Flamberen blijft zijn grootste plezier, en dat maakt van elke crêpe Suzette een klein spektakel aan tafel.

Ook in wijn heeft Tom een stevige basis als sommelier.', 'Tom came to Au Vieux Port as an intern in 2009 and never left. Today, as maître d'', he is responsible for the smooth running of every lunch and every dinner.

Hospitality is his hallmark. Guests are welcomed by Tom with a broad smile, and he makes sure you are looked after all evening.

His great passion is carving at the table. Chicken, partridge, pheasant, saddle of hare, sole, turbot: Tom carves them expertly, in front of you. He has passed this skill, including the preparation of our Canard à la Rouennaise, on to the whole dining-room team. Flambéing remains his greatest pleasure, and it turns every crêpe Suzette into a small spectacle at the table.

Tom also has a solid background in wine as a sommelier.', 'Tom est arrivé à Au Vieux Port comme stagiaire en 2009 et n''est jamais reparti. Aujourd''hui, en tant que maître d''hôtel, il veille au bon déroulement de chaque déjeuner et de chaque dîner.

L''hospitalité est sa marque de fabrique. Tom accueille chaque convive avec un large sourire et veille à ce que vous soyez choyé toute la soirée.

Sa grande passion est la découpe en salle. Poulet, perdreau, faisan, râble de lièvre, sole, turbot : Tom les découpe avec maîtrise, sous vos yeux. Il a transmis ce savoir-faire, y compris celui de notre Canard à la Rouennaise, à toute l''équipe de salle. Flamber reste son plus grand plaisir, et chaque crêpe Suzette devient ainsi un petit spectacle à table.

Tom possède également une solide formation de sommelier.', '/img/team/tom-schoonbaert.webp', null, null, null, null, 20),
  ('jens-de-ridder', 'Jens De Ridder', 'Sommelier', 'Sommelier', 'Sommelier', 'Jens zocht op school een tijd naar zijn richting, tot hij in het vierde middelbaar aan de hotelschool Stella Maris in Merksem begon. Daar vond hij ze. Na het zesde jaar volgde hij nog een specialisatiejaar drankenkennis. De liefde voor wijn kreeg hij deels van thuis mee: zijn vader zat in een wijnclub en is een groot liefhebber van een goed glas.

Zijn stage liep hij in De Kleine Barreel in Schoten, een huis dat bekendstond om zijn klassieke keuken en zijn zaalbereidingen, zoals wij ze vandaag in Au Vieux Port doen. Na zijn afstuderen in 2012 bleef hij er werken, tot het restaurant begin 2015 sloot. Daarna volgden bijna tien jaar in Pazzo, waar wijn centraal staat en waar hij enorm veel bijleerde. Toch begon hij het klassieke restaurant te missen, met zijn zaalbereidingen en versnijdingen aan tafel. Sinds 2025 is hij sommelier in Au Vieux Port.

Zijn smaak is met de jaren verfijnd. “In mijn beginjaren dacht ik dat een wijn vol hout en vanille het beste was wat er bestond. Vandaag gaat mijn voorkeur eerder naar wit.” Een frisse Albariño met een tikje ziltigheid, of een grote Chablis als het wat meer mag zijn.

Vraag je hem naar zijn favorieten, dan noemt hij voor wit de Chablis van Raveneau of van Thomas Pico (Domaine Pattes Loup), en voor rood de verfijning van een Nebbiolo van Roagna of een Chambolle-Musigny van Ghislaine Barthod. U vindt ze allemaal op onze wijnkaart.', 'Jens spent some time at school looking for his path, until he started at the Stella Maris hotel school in Merksem in his fourth year of secondary school. There he found it. After his sixth year he added a specialisation year in beverages. His love of wine came partly from home: his father was a member of a wine club and is a great lover of a good glass.

He did his internship at De Kleine Barreel in Schoten, a house known for its classic cuisine and tableside preparations, just as we do them at Au Vieux Port today. After graduating in 2012 he stayed on, until the restaurant closed in early 2015. Then came almost ten years at Pazzo, where wine takes centre stage and where he learned an enormous amount. Yet he began to miss the classic restaurant, with its tableside preparations and carving. Since 2025 he has been the sommelier at Au Vieux Port.

His palate has grown more refined over the years. “In my early years I thought a wine full of oak and vanilla was the best thing there was. Today my preference leans towards white.” A fresh Albariño with a hint of salinity, or a great Chablis when the occasion calls for more.

Ask him for his favourites and he names, for white, the Chablis of Raveneau or of Thomas Pico (Domaine Pattes Loup), and for red, the finesse of a Nebbiolo from Roagna or a Chambolle-Musigny from Ghislaine Barthod. You will find them all on our wine list.

Book a table', 'À l''école, Jens a longtemps cherché sa voie, jusqu''à ce qu''il entre à l''école hôtelière Stella Maris de Merksem en quatrième secondaire. Là, il l''a trouvée. Après la sixième, il a suivi une année de spécialisation en connaissance des boissons. Son amour du vin lui vient en partie de la maison : son père faisait partie d''un club œnologique et apprécie beaucoup un bon verre.

Il a effectué son stage à De Kleine Barreel, à Schoten, une maison réputée pour sa cuisine classique et ses préparations en salle, telles que nous les pratiquons aujourd''hui à Au Vieux Port. Diplômé en 2012, il y est resté jusqu''à la fermeture du restaurant début 2015. Suivirent près de dix ans chez Pazzo, où le vin est au centre de tout et où il a énormément appris. Mais le restaurant classique, avec ses préparations et ses découpes en salle, lui manquait. Depuis 2025, il est sommelier à Au Vieux Port.

Son palais s''est affiné au fil des années. « À mes débuts, je pensais qu''un vin plein de bois et de vanille était ce qui se faisait de mieux. Aujourd''hui, ma préférence va plutôt au blanc. » Un Albariño frais à la pointe saline, ou un grand Chablis quand l''occasion le permet.

Ses favoris ? En blanc, le Chablis de Raveneau ou de Thomas Pico (Domaine Pattes Loup) ; en rouge, la finesse d''un Nebbiolo de Roagna ou un Chambolle-Musigny de Ghislaine Barthod. Vous les trouverez tous sur notre carte des vins.', '/img/team/jens-de-ridder.webp', null, null, null, null, 30);
