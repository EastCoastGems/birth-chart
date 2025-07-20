const swisseph = require('swisseph');
const { planetposition, julian } = require('astronomia');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API endpoint for chart data (if you want to add server-side processing)
app.post('/api/chart', async (req, res) => {
  try {
    const { year, month, day, hour, minute, lat, lng } = req.body;
    
    // Validate input
    if (!year || !month || !day || !hour || !minute || !lat || !lng) {
      return res.status(400).json({ 
        error: 'Missing required parameters: year, month, day, hour, minute, lat, lng' 
      });
    }
    
    // Calculate Julian Day
    const birthDate = new Date(year, month - 1, day, hour, minute);
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date/time provided' });
    }
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'Invalid coordinates provided' });
    }
    const jd = julian.CalendarGregorianToJD(year, month, day) + (hour + minute / 60) / 24;
    // Calculate planetary positions
    const planets = {
      Sun: planetposition.sun.position(jd).lon,
      Moon: planetposition.moon.position(jd).lon,
      Mercury: planetposition.mercury.position(jd).lon,
      Venus: planetposition.venus.position(jd).lon,
      Mars: planetposition.mars.position(jd).lon,
      Jupiter: planetposition.jupiter.position(jd).lon,
      Saturn: planetposition.saturn.position(jd).lon,
      Uranus: planetposition.uranus.position(jd).lon,
      Neptune: planetposition.neptune.position(jd).lon,
      Pluto: planetposition.pluto.position(jd).lon
    };

    // Calculate houses and ascendant using swisseph
    swisseph.swe_set_ephe_path(__dirname); // Set ephemeris path
    swisseph.swe_houses(jd, lat, lng, 'P', (housesResult) => {
      const houses = {};
      for (let i = 1; i <= 12; i++) {
        let cusp = housesResult.cusps[i];
        if (typeof cusp !== 'number' || isNaN(cusp)) {
          cusp = 0;
        }
        houses[i] = { lon: cusp };
      }
      let ascendant = housesResult.ascendant;
      if (typeof ascendant !== 'number' || isNaN(ascendant)) {
        ascendant = 0;
      }
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌟 Birth Chart Server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} to view the application`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
