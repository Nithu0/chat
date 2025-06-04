const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

app.use(express.json());
app.use(express.static('public'));

function loadBookings() {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveBookings(bookings) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

app.post('/bookings', (req, res) => {
  const booking = req.body;
  const bookings = loadBookings();
  bookings.push({ ...booking, id: Date.now() });
  saveBookings(bookings);
  res.send('Bestilling mottatt!');
});

app.get('/bookings', (req, res) => {
  res.json(loadBookings());
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
