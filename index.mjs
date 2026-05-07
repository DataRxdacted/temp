
import express from 'express';
import sqlite3pkg from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const sqlite3 = sqlite3pkg.verbose();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// views + static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// db setup
const dbPath = path.join(__dirname, 'data', 'park.db');
const dbExists = fs.existsSync(dbPath);
const db = new sqlite3.Database(dbPath);

// If there isnt a database it'll create a new one.
if (!dbExists) {
    console.log('no db found, building from seed...');
    const seedSql = fs.readFileSync(path.join(__dirname, 'data', 'seed.sql'), 'utf-8');
    db.exec(seedSql, (err) => {
        if (err) console.error('Seeding failed:', err);
        else console.log('seeded ok');
    });
}


// Homepage
app.get('/', (req, res) => {
    db.all('SELECT * FROM habitats ORDER BY id', (err, habitats) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.render('index', { habitats });
    });
});

// All habitats listing
app.get('/habitats', (req, res) => {
    db.all('SELECT * FROM habitats ORDER BY id', (err, habitats) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.render('habitats', { habitats });
    });
});

// Single habitat with its exhibits
app.get('/habitat/:id', (req, res) => {
    const habitatId = req.params.id;

    db.get('SELECT * FROM habitats WHERE id = ?', [habitatId], (err, habitat) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        if (!habitat) {
            return res.status(404).render('404');
        }
        db.all(
            'SELECT * FROM exhibits WHERE habitat_id = ? ORDER BY id',
            [habitatId],
            (err2, exhibits) => {
                if (err2) {
                    console.error(err2);
                    return res.status(500).send('Database error');
                }
                res.render('habitat', { habitat, exhibits });
            }
        );
    });
});

// Faq page
app.get('/faq', (req, res) => {
    res.render('faq');
});

// Contact page
app.get('/contact', (req, res) => {
    res.render('contact', { submitted: false, errors: null });
});

// Contact form submit
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation server side
    const errors = [];
    if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Please enter a valid email.');
    if (!subject || subject.trim().length < 3) errors.push('Subject must be at least 3 characters.');
    if (!message || message.trim().length < 10) errors.push('Message is too short (10 characters minimum).');

    if (errors.length > 0) {
        return res.render('contact', { submitted: false, errors });
    }

    db.run(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name.trim(), email.trim(), subject.trim(), message.trim()],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Database error');
            }
            res.render('contact', { submitted: true, errors: null });
        }
    );
});


app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`server up at http://localhost:${PORT}`);
});
