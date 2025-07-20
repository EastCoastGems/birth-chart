
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

app.post('/api/chart', async (req, res) => {
  try {
    const { year, month, day, hour, minute, lat, lng } = req.body;
    if ([year, month, day, hour, minute, lat, lng].some(v => v === undefined || v === null)) {
      return res.status(400).json({ error: 'Missing required parameters: year, month, day, hour, minute, lat, lng' });
    }
    const birthDate = new Date(year, month - 1, day, hour, minute);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date/time provided' });
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'Invalid coordinates provided' });
    }
    const jd = julian.CalendarGregorianToJD(year, month, day) + (hour + minute / 60) / 24;

    // Calculate planetary positions
    const planets = {};
    try {
      const planetList = [
        'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
        'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
      ];
      for (const pname of planetList) {
        let result;
        try {
          result = planetposition[pname.toLowerCase()]?.position(jd);
        } catch (err) {
          console.error(`Error calling planetposition.${pname.toLowerCase()}.position(jd):`, err);
        }
        if (!result || typeof result.lon !== 'number') {
          console.warn(`planetposition.${pname.toLowerCase()}.position(jd) returned:`, result);
        }
        planets[pname] = result?.lon ?? null;
      }
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

module.exports = app;
