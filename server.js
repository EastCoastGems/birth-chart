const express = require('express');
const cors = require('cors');
const swisseph = require('swisseph');

const app = express();

// Allow CORS for local dev and GitHub Pages
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080',
    'https://eastcoastgems.github.io'
  ]
}));
app.use(express.json());

app.post('/chart', (req, res) => {
  const { year, month, day, hour, minute, lat, lng } = req.body;
  const utcHour = hour + minute / 60;

  swisseph.swe_set_ephe_path('.');

  const jd = swisseph.swe_julday(year, month, day, utcHour, swisseph.SE_GREG_CAL);

  swisseph.swe_houses(jd, lat, lng, 'P', (houses) => {
    const planets = {};
    const planetIds = [
      swisseph.SE_SUN, swisseph.SE_MOON, swisseph.SE_MERCURY, swisseph.SE_VENUS,
      swisseph.SE_MARS, swisseph.SE_JUPITER, swisseph.SE_SATURN,
      swisseph.SE_URANUS, swisseph.SE_NEPTUNE, swisseph.SE_PLUTO
    ];
    let completed = 0;
    planetIds.forEach((pid) => {
      swisseph.swe_calc_ut(jd, pid, swisseph.SEFLG_SWIEPH, (planet) => {
        planets[pid] = planet.longitude;
        completed++;
        if (completed === planetIds.length) {
          res.json({
            ascendant: houses.ascendant,
            houses: houses.houses || houses,
            planets
          });
        }
      });
    });
  });
});

app.listen(3001, () => console.log('Swiss Ephemeris backend running on port 3001'));
