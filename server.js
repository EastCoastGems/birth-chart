const swisseph = require('swisseph');
const { planetposition, julian } = require('astronomia');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Simple test endpoint to verify Express is running
app.get('/test', (req, res) => {
  res.send('Express is working!');
});

app.post('/api/chart', async (req, res) => {
  try {
    console.log('Received chart request:', req.body);
    const { year, month, day, hour, minute, lat, lng } = req.body;
    if ([year, month, day, hour, minute, lat, lng].some(v => v === undefined || v === null)) {
      console.error('Missing required parameters:', { year, month, day, hour, minute, lat, lng });
      return res.status(400).json({ error: 'Missing required parameters: year, month, day, hour, minute, lat, lng' });
    }
    const birthDate = new Date(year, month - 1, day, hour, minute);
    if (isNaN(birthDate.getTime())) {
      console.error('Invalid date/time provided:', { year, month, day, hour, minute });
      return res.status(400).json({ error: 'Invalid date/time provided' });
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.error('Invalid coordinates provided:', { lat, lng });
      return res.status(400).json({ error: 'Invalid coordinates provided' });
    }
    const jd = julian.CalendarGregorianToJD(year, month, day) + (hour + minute / 60) / 24;
    console.log('Julian date calculated:', jd);

    // Calculate planetary positions
    const planets = {};
    try {
      // Use Swiss Ephemeris for planet positions
      const swePlanets = {
        Sun: swisseph.SE_SUN,
        Moon: swisseph.SE_MOON,
        Mercury: swisseph.SE_MERCURY,
        Venus: swisseph.SE_VENUS,
        Mars: swisseph.SE_MARS,
        Jupiter: swisseph.SE_JUPITER,
        Saturn: swisseph.SE_SATURN,
        Uranus: swisseph.SE_URANUS,
        Neptune: swisseph.SE_NEPTUNE,
        Pluto: swisseph.SE_PLUTO
      };
      for (const [pname, sweId] of Object.entries(swePlanets)) {
        swisseph.swe_calc_ut(jd, sweId, 0, (planetResult) => {
          if (planetResult.error) {
            console.warn(`swisseph.swe_calc_ut error for ${pname}:`, planetResult.error);
            planets[pname] = null;
          } else {
            planets[pname] = planetResult.longitude;
          }
        });
      }
      console.log('Planet positions calculated:', planets);
    } catch (planetErr) {
      console.error('Planet calculation error:', planetErr);
      return res.status(500).json({ error: 'Planet calculation failed', details: planetErr.message });
    }

    // Calculate houses and ascendant using swisseph
    swisseph.swe_set_ephe_path(__dirname);
    swisseph.swe_houses(jd, lat, lng, 'P', (housesResult) => {
      if (!housesResult || housesResult.error || !housesResult.house) {
        console.error('Swiss Ephemeris error:', housesResult?.error ?? 'No result');
        return res.status(500).json({ error: 'Swiss Ephemeris calculation failed', details: housesResult?.error ?? 'No result' });
      }
      const houses = {};
      for (let i = 1; i <= 12; i++) {
        let cusp = housesResult.house[i - 1];
        houses[String(i)] = { lon: typeof cusp === 'number' && !isNaN(cusp) ? cusp : null };
      }
      let ascendant = typeof housesResult.ascendant === 'number' && !isNaN(housesResult.ascendant) ? housesResult.ascendant : null;
      console.log('Houses and ascendant calculated:', houses, ascendant);
      res.json({
        planets,
        houses,
        ascendant,
        message: 'Chart calculated with astronomia and swisseph',
        input: { year, month, day, hour, minute, lat, lng },
        birthDate: birthDate.toISOString()
      });
    });
  } catch (error) {
    console.error('Chart API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`🌟 Birth Chart Server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} to view the application`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});

