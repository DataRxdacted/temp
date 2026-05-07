CREATE TABLE IF NOT EXISTS habitats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    short_description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    image TEXT NOT NULL,
    accent_colour TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS exhibits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habitat_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    type TEXT NOT NULL,
    FOREIGN KEY (habitat_id) REFERENCES habitats(id)
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Habitats
INSERT INTO habitats (name, short_description, long_description, image, accent_colour) VALUES
('Rainforest Canopy',
 'Tropical birds, tree frogs and a boardwalk 12 metres up in the canopy.',
 'Walk our boardwalks through the canopy - they look scarier than they are. Tropical birds, tiny tree frogs and a mist that keeps everything damp. One of the better spots in the park to slow down a bit.',
 '/images/rainforest.jpg',
 '#2d6a3e'),

('Savannah Plains',
 'Wide open grasslands that the animals that call them home.',
 'The biggest enclosure in the park by a long way. There are elevated viewing platforms and you can watch the keeper feeds from up there.',
 '/images/savannah.jpg',
 '#b8843a'),

('Reptile World',
 'Lizards, snakes, tortoises and a few amphibians all under one roof.',
 'A climate-controlled glass pavilion with lizards, snakes, tortoises and amphibians. There are daily handling sessions and the keepers know their stuff if you have questions.',
 '/images/reptile.jpg',
 '#5a7d3a'),

('Coastal Cove',
 'Rocky shoreline, tidal pools and a small colony of rescued puffins.',
 'A recreated British coastline with tidal pools you can touch, rescued puffins and a conservation hatchery for native shorebirds. Worth visiting in the morning when feeding happens.',
 '/images/coastal.jpg',
 '#3a6e7d'),

('Woodland Trail',
 'A walking route through native British woodland.',
 'A few miles of marked paths through native woodland. Keep quiet and you might spot red squirrels or deer - no promises though.',
 '/images/woodland.jpg',
 '#4a5d2a');

-- Exhibits s
INSERT INTO exhibits (habitat_id, name, description, image, type) VALUES
-- Rainforest (1)
(1, 'Treetop Walkway',
 'A suspended boardwalk 12 metres up among the highest branches. Mostly accessible, with a step-free entry from the east side.',
 '/images/exhibit-walkway.jpg',
 'Experience'),
(1, 'Poison Frog Vivarium',
 'Glass enclosures with a few species of poison dart frogs - they are tiny but the colours are actually wild.',
 '/images/exhibit-frogs.jpg',
 'Exhibit'),
(1, 'Toucan Aviary',
 'Open aviary with a small flock of toucans and assorted softbills. Keeper talks at 11am.',
 '/images/exhibit-toucan.jpg',
 'Exhibit'),

-- Savannah (2)
(2, 'Giraffe Feeding Platform',
 'Feed the giraffes from a raised platform - they come right up to you. Runs twice a day.',
 '/images/exhibit-giraffe.jpg',
 'Experience'),
(2, 'Zebra Enclosure',
 'Our zebras. The viewing window looks straight onto a mud wallow they use most afternoons.',
 '/images/exhibit-zebra.jpg',
 'Exhibit'),
(2, 'Meerkat Lookout',
 'A network of tunnels and mounds full of meerkats. There is a viewing tunnel that goes underneath the whole thing - kids always want to go in it.',
 '/images/exhibit-meerkat.jpg',
 'Exhibit'),

-- Reptile World (3)
(3, 'Snake House',
 'Pythons, boas, milk snakes and a corn snake that gets brought out during keeper sessions.',
 '/images/exhibit-snake.jpg',
 'Exhibit'),
(3, 'Giant Tortoise Yard',
 'Home to gigantic tortoises, might walk very slowly but definitely full of character.',
 '/images/exhibit-tortoise.jpg',
 'Exhibit'),
(3, 'Reptile Handling Session',
 'A short hands-on session in a small group. Suitable for ages 6+. First come, first served.',
 '/images/exhibit-handling.jpg',
 'Experience'),

-- Coastal Cove (4)
(4, 'Tidal Rockpool',
 'A real working tidal pool with anemones, hermit crabs and starfish. Touch encouraged - gently!',
 '/images/exhibit-rockpool.jpg',
 'Experience'),
(4, 'Puffin Cliff',
 'Rescued Atlantic puffins on a recreated cliff face. You will see more of them in spring when they are breeding.',
 '/images/exhibit-puffin.jpg',
 'Exhibit'),

-- Woodland Trail (5)
(5, 'Red Squirrel Hide',
 'Red squirrels may show up!',
 '/images/exhibit-squirrel.jpg',
 'Exhibit'),
(5, 'Bat Roost Tower',
 'A tower built for bats, with a few species living in it now. Best at dusk during the summer evening events.',
 '/images/exhibit-bat.jpg',
 'Exhibit'),
(5, 'Forest Foraging Walk',
 'A guided walk where they show you edible plants in the woodland. Saturdays only, max 12 people.',
 '/images/exhibit-foraging.jpg',
 'Experience');
