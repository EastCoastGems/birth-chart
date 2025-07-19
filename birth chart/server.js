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
    
    // Here you could add server-side validation or processing
    // For now, we'll just validate the input and return success
    const birthDate = new Date(year, month - 1, day, hour, minute);
    
    if (isNaN(birthDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date/time provided' });
    }
    
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'Invalid coordinates provided' });
    }
    
    res.json({
      message: 'Chart request processed successfully',
      input: { year, month, day, hour, minute, lat, lng },
      birthDate: birthDate.toISOString(),
      note: 'This endpoint can be extended for server-side chart calculations'
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
