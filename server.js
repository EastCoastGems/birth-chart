<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Discover Your Astrology Blueprint</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      padding: 2rem;
      text-align: center;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    header img {
      max-width: 180px;
      margin-bottom: 1rem;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    h1 {
      color: #ffffff;
      font-weight: bold;
      margin-bottom: 2rem;
      font-size: 2.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    form, #results {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 15px;
      max-width: 450px;
      margin: 2rem auto;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      text-align: left;
      border: 1px solid rgba(255,255,255,0.2);
    }
    
    label {
      display: block;
      margin-top: 1rem;
      font-weight: 600;
      color: #333;
    }
    
    input, select, button {
      width: 100%;
      padding: 0.75rem;
      margin-top: 0.5rem;
      font-size: 1rem;
      box-sizing: border-box;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    
    input:focus, select:focus {
      outline: none;
      border-color: #b23cf0;
      box-shadow: 0 0 0 3px rgba(178, 60, 240, 0.1);
    }
    
    button {
      margin-top: 1.5rem;
      background: linear-gradient(135deg, #b23cf0 0%, #962dcc 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;
    }
    
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(178, 60, 240, 0.4);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    .radio-group {
      margin-top: 1rem;
    }
    
    .radio-group label {
      display: inline-block;
      margin-right: 1.5rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transition: all 0.3s ease;
    }
    
    .radio-group input[type="radio"] {
      width: auto;
      margin-right: 0.5rem;
    }
    
    .radio-group label:hover {
      background: rgba(178, 60, 240, 0.1);
    }
    
    .chart-container {
      display: none;
      margin: 2rem auto;
      border-radius: 50%;
      background: linear-gradient(90deg,
        rgba(255,0,0,0.12),
        rgba(255,127,0,0.12),
        rgba(255,255,0,0.12),
        rgba(0,255,0,0.12),
        rgba(0,0,255,0.12),
        rgba(75,0,130,0.12),
        rgba(148,0,211,0.12));
      width: 400px;
      height: 400px;
      justify-content: center;
      align-items: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    
    #birth-chart {
      background: transparent;
      border-radius: 50%;
    }
    
    .sky-container {
      display: none;
      margin: 2rem auto;
      max-width: 450px;
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 15px;
      backdrop-filter: blur(10px);
    }
    
    #skyCanvas {
      width: 100%;
      height: 250px;
      background: radial-gradient(ellipse at bottom, #1a237e, #000051);
      border-radius: 10px;
      box-shadow: inset 0 0 50px rgba(0,0,0,0.5);
    }
    
    #downloadBtn {
      margin-top: 1rem;
      background: linear-gradient(135deg, #424242 0%, #212121 100%);
      color: white;
      width: auto;
      padding: 0.75rem 1.5rem;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    #downloadBtn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(66, 66, 66, 0.4);
    }
    
    .loading {
      font-style: italic;
      color: #666;
      font-size: 1.1rem;
    }
    
    #chart-description {
      margin: 2rem auto;
      max-width: 450px;
      color: #ffffff;
      font-size: 1.2rem;
      display: none;
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }
    
    .error {
      background: rgba(244, 67, 54, 0.1);
      border: 1px solid #f44336;
      color: #d32f2f;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
    }
    
    .success {
      background: rgba(76, 175, 80, 0.1);
      border: 1px solid #4caf50;
      color: #388e3c;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
    }
    
    .aspect-list {
      max-height: 300px;
      overflow-y: auto;
      border: 1px solid #e1e5e9;
      border-radius: 8px;
      padding: 0.5rem;
      background: rgba(248, 249, 250, 0.8);
    }
    
    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      form, #results {
        margin: 1rem auto;
        padding: 1.5rem;
      }
      
      .chart-container {
        width: 300px;
        height: 300px;
      }
      
      .radio-group label {
        display: block;
        margin-bottom: 0.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <img src="https://i.ibb.co/ZRrgQ9db/IMG-2055.png" alt="Astrology Blueprint Logo">
    </header>

    <h1>Discover Your Astrology Blueprint</h1>

    <form id="birth-form" autocomplete="off">
      <label>Date of Birth:
        <input type="date" id="birthdate" required />
      </label>
      <label>Time of Birth:
        <input type="time" id="birthtime" required />
      </label>
      <label>Birthplace (City, State or Country):
        <input type="text" id="location" placeholder="e.g. New York, NY or London, UK" required />
      </label>
      <div class="radio-group">
        <label><input type="radio" name="readingType" value="bigThree" checked> Big Three Only</label>
        <label><input type="radio" name="readingType" value="fullChart"> Complete Chart</label>
      </div>
      <button type="submit">Generate Your Chart</button>
    </form>

    <div id="chart-description">
      Your personalized astrology wheel with planetary positions and house cusps.
    </div>

    <div class="chart-container">
      <canvas id="birth-chart" width="400" height="400" aria-label="Astrology chart wheel"></canvas>
    </div>

    <div class="sky-container">
      <canvas id="skyCanvas" width="400" height="250" aria-label="Sky map showing planetary positions"></canvas>
      <button id="downloadBtn">📥 Download Your Sky Map</button>
    </div>

    <div id="results"></div>
  </div>

  <script>
    (function() {
      // Configuration
      const CONFIG = {
        apiKey: 'f4828f886eb04102855182883c0428a2',
        backendUrl: 'https://birth-chart-5kyi.onrender.com/chart',
        wheelImageUrl: 'https://i.ibb.co/4n68qcsP/Untitled-design.png'
      };

      // DOM Elements
      const elements = {
        form: document.getElementById('birth-form'),
        resultsDiv: document.getElementById('results'),
        chartContainer: document.querySelector('.chart-container'),
        canvas: document.getElementById('birth-chart'),
        skyContainer: document.querySelector('.sky-container'),
        skyCanvas: document.getElementById('skyCanvas'),
        downloadBtn: document.getElementById('downloadBtn'),
        chartDesc: document.getElementById('chart-description'),
        birthdate: document.getElementById('birthdate'),
        birthtime: document.getElementById('birthtime'),
        location: document.getElementById('location')
      };

      const skyCtx = elements.skyCanvas.getContext('2d');

      // Constants
      const SIGNS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

      const PLANET_COLORS = {
        Sun: "#FFD700", Moon: "#C0C0C0", Mercury: "#FFA500", Venus: "#FF69B4",
        Mars: "#FF4500", Jupiter: "#8A2BE2", Saturn: "#2F4F4F",
        Uranus: "#4FD0E3", Neptune: "#4169E1", Pluto: "#8B4513"
      };

      const PLANET_SYMBOLS = {
        Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂",
        Jupiter: "♃", Saturn: "♄", Uranus: "♅", Neptune: "♆", Pluto: "♇"
      };

      const PLANET_NAMES = {
        0: 'Sun', 1: 'Moon', 2: 'Mercury', 3: 'Venus', 4: 'Mars',
        5: 'Jupiter', 6: 'Saturn', 7: 'Uranus', 8: 'Neptune', 9: 'Pluto'
      };

      // Utility Functions
      function degToSign(deg) {
        deg = ((deg % 360) + 360) % 360;
        const index = Math.floor(deg / 30);
        return { 
          sign: SIGNS[index], 
          degree: (deg % 30).toFixed(2), 
          raw: deg,
          minutes: Math.floor((deg % 1) * 60),
          seconds: Math.floor(((deg % 1) * 60 % 1) * 60)
        };
      }

      function eclipticToAzimuth(deg) {
        return (deg / 360) * elements.skyCanvas.width;
      }

      function planetAltitude(deg) {
        return 125 - 75 * Math.cos(deg * Math.PI / 180);
      }

      function showError(message) {
        elements.resultsDiv.innerHTML = `<div class="error">⚠️ Error: ${message}</div>`;
      }

      function showLoading() {
        elements.resultsDiv.innerHTML = '<p class="loading">🔮 Calculating your birth chart...</p>';
      }

      // Aspect Calculations
      function calculateAspects(planetsRaw) {
        const aspects = [];
        const aspectAngles = [
          { name: "Conjunction", symbol: "☌", angle: 0, orb: 8, color: "#FF6B6B" },
          { name: "Opposition", symbol: "☍", angle: 180, orb: 8, color: "#4ECDC4" },
          { name: "Trine", symbol: "△", angle: 120, orb: 7, color: "#45B7D1" },
          { name: "Square", symbol: "□", angle: 90, orb: 6, color: "#F9CA24" },
          { name: "Sextile", symbol: "✶", angle: 60, orb: 5, color: "#6C5CE7" }
        ];

        const keys = Object.keys(planetsRaw);
        for (let i = 0; i < keys.length; i++) {
          for (let j = i + 1; j < keys.length; j++) {
            const p1 = keys[i], p2 = keys[j];
            const lon1 = planetsRaw[p1].lon, lon2 = planetsRaw[p2].lon;
            let diff = Math.abs(lon1 - lon2);
            if (diff > 180) diff = 360 - diff;

            for (const asp of aspectAngles) {
              if (Math.abs(diff - asp.angle) <= asp.orb) {
                aspects.push({
                  p1, p2, type: asp.name, symbol: asp.symbol, 
                  orb: Math.abs(diff - asp.angle).toFixed(2),
                  color: asp.color,
                  exact: Math.abs(diff - asp.angle) < 1
                });
                break; // Only one aspect per planet pair
              }
            }
          }
        }
        return aspects.sort((a, b) => parseFloat(a.orb) - parseFloat(b.orb));
      }

      // Chart Pattern Detection
      function detectChartPattern(planetsRaw) {
        const longitudes = Object.values(planetsRaw).map(p => p.lon).sort((a, b) => a - b);
        let maxGap = 0;
        let gaps = [];

        for (let i = 0; i < longitudes.length; i++) {
          const next = longitudes[(i + 1) % longitudes.length];
          let gap = (next - longitudes[i] + 360) % 360;
          gaps.push(gap);
          if (gap > maxGap) maxGap = gap;
        }

        const totalSpread = (longitudes[longitudes.length - 1] - longitudes[0] + 360) % 360;

        if (maxGap > 180) return "Splash Pattern - Planets scattered evenly around the chart";
        if (totalSpread < 120) return "Bundle Pattern - All planets within 120°, indicating focused energy";
        if (maxGap > 120) return "Bowl Pattern - Planets occupy about half the chart";
        if (gaps.filter(g => g > 60).length === 1) return "Bucket Pattern - One planet isolated from the main group";
        if (totalSpread > 240) return "Locomotive Pattern - Planets occupy 2/3 of the chart with one empty third";
        return "See-Saw Pattern - Planets in two opposing groups";
      }

      // Geocoding with error handling
      async function geocodeLocation(location) {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${CONFIG.apiKey}&limit=1`
          );
          
          if (!response.ok) {
            throw new Error(`Geocoding service error: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (!data.results || data.results.length === 0) {
            throw new Error('Location not found. Please try a different format (e.g., "New York, NY" or "London, UK")');
          }
          
          return data.results[0].geometry;
        } catch (error) {
          throw new Error(`Failed to find location: ${error.message}`);
        }
      }

      // Backend API call with retry logic
      async function fetchChartData(chartParams, retries = 2) {
        for (let attempt = 0; attempt <= retries; attempt++) {
          try {
            const response = await fetch(CONFIG.backendUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(chartParams),
              timeout: 10000 // 10 second timeout
            });

            if (!response.ok) {
              throw new Error(`Backend service error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.planets || !data.houses || data.ascendant === undefined) {
              throw new Error('Invalid data received from calculation service');
            }
            
            return data;
          } catch (error) {
            if (attempt === retries) {
              throw new Error(`Chart calculation failed: ${error.message}`);
            }
            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          }
        }
      }

      // Enhanced chart drawing
      function drawChart(planetsRaw, houses, ctx) {
        const centerX = elements.canvas.width / 2;
        const centerY = elements.canvas.height / 2;
        const radius = elements.canvas.width / 2 - 40;

        // Draw house cusps
        ctx.save();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1.5;
        ctx.font = 'bold 12px Arial';
        ctx.fillStyle = '#333';

        for (let i = 1; i <= 12; i++) {
          const deg = houses[i].raw;
          const angle = (deg - 90) * Math.PI / 180; // 0° Aries at top
          const x1 = centerX + (radius - 20) * Math.cos(angle);
          const y1 = centerY + (radius - 20) * Math.sin(angle);
          const x2 = centerX + (radius + 15) * Math.cos(angle);
          const y2 = centerY + (radius + 15) * Math.sin(angle);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          ctx.fillText(i.toString(), x2 + 8, y2 + 4);
        }
        ctx.restore();

        // Draw planets with improved positioning
        for (const [key, planet] of Object.entries(planetsRaw)) {
          const deg = planet.lon;
          const angle = (deg - 90) * Math.PI / 180;
          const x = centerX + (radius - 35) * Math.cos(angle);
          const y = centerY + (radius - 35) * Math.sin(angle);

          // Planet circle
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fillStyle = PLANET_COLORS[key] || '#b23cf0';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Planet symbol
          ctx.font = 'bold 16px Arial';
          ctx.fillStyle = '#222';
          ctx.textAlign = 'center';
          ctx.fillText(PLANET_SYMBOLS[key] || key.charAt(0), x + 20, y + 5);
        }
      }

      // Enhanced sky map
      function drawSkyMap(planetsRaw) {
        elements.skyContainer.style.display = 'block';
        skyCtx.clearRect(0, 0, elements.skyCanvas.width, elements.skyCanvas.height);

        // Create realistic sky gradient
        const grad = skyCtx.createRadialGradient(
          elements.skyCanvas.width/2, elements.skyCanvas.height, 0,
          elements.skyCanvas.width/2, elements.skyCanvas.height, elements.skyCanvas.height
        );
        grad.addColorStop(0, "#1a237e");
        grad.addColorStop(0.7, "#000051");
        grad.addColorStop(1, "#000");
        skyCtx.fillStyle = grad;
        skyCtx.fillRect(0, 0, elements.skyCanvas.width, elements.skyCanvas.height);

        // Draw stars
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * elements.skyCanvas.width;
          const y = Math.random() * elements.skyCanvas.height;
          const size = Math.random() * 1.5;
          
          skyCtx.beginPath();
          skyCtx.arc(x, y, size, 0, 2 * Math.PI);
          skyCtx.fillStyle = "#fff";
          skyCtx.globalAlpha = Math.random() * 0.8 + 0.2;
          skyCtx.fill();
        }
        skyCtx.globalAlpha = 1;

        // Draw planets
        for (const [key, planet] of Object.entries(planetsRaw)) {
          const deg = planet.lon;
          const x = eclipticToAzimuth(deg);
          const y = planetAltitude(deg);

          // Planet glow effect
          skyCtx.beginPath();
          skyCtx.arc(x, y, 12, 0, 2 * Math.PI);
          skyCtx.fillStyle = PLANET_COLORS[key] || '#b23cf0';
          skyCtx.shadowColor = PLANET_COLORS[key] || '#b23cf0';
          skyCtx.shadowBlur = 15;
          skyCtx.fill();
          skyCtx.shadowBlur = 0;

          // Planet symbol
          skyCtx.font = 'bold 20px Arial';
          skyCtx.fillStyle = '#fff';
          skyCtx.textAlign = 'center';
          skyCtx.fillText(PLANET_SYMBOLS[key] || key.charAt(0), x, y - 20);
        }
      }

      // Form submission handler
      elements.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset display
        showLoading();
        elements.chartContainer.style.display = 'none';
        elements.skyContainer.style.display = 'none';
        elements.chartDesc.style.display = 'none';

        // Get form data
        const date = elements.birthdate.value;
        const time = elements.birthtime.value;
        const location = elements.location.value;
        const readingType = document.querySelector('input[name="readingType"]:checked').value;

        // Validation
        if (!date || !time || !location) {
          showError('Please fill out all fields.');
          return;
        }

        try {
          // Geocode location
          const { lat, lng } = await geocodeLocation(location);

          // Parse date and time
          const [year, month, day] = date.split('-').map(Number);
          const [hour, minute] = time.split(':').map(Number);

          // Fetch chart data
          const backendData = await fetchChartData({ year, month, day, hour, minute, lat, lng });

          // Process data
          const ascendant = backendData.ascendant;
          const planetsRaw = {};
          
          for (const pid in backendData.planets) {
            if (PLANET_NAMES[pid]) {
              planetsRaw[PLANET_NAMES[pid]] = { lon: backendData.planets[pid] };
            }
          }

          const houses = {};
          const hsrc = backendData.houses;
          for (let i = 1; i <= 12; i++) {
            let houseDeg;
            if (Array.isArray(hsrc)) {
              houseDeg = hsrc[i-1];
            } else {
              houseDeg = hsrc[i] ?? hsrc[String(i)];
            }
            if (typeof houseDeg !== "number" || isNaN(houseDeg)) houseDeg = 0;
            houses[i] = degToSign(houseDeg);
          }

          // Calculate aspects and pattern
          const aspects = calculateAspects(planetsRaw);
          const chartPattern = detectChartPattern(planetsRaw);

          // Generate results HTML
          let outputHTML = `<h2>🌟 Your Birth Chart Analysis</h2>`;
          outputHTML += `<div class="success">📍 Birth Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`;
          outputHTML += `<p><strong>🔮 Ascendant (Rising Sign):</strong> ${degToSign(ascendant).sign} ${degToSign(ascendant).degree}°</p>`;
          
          if (readingType === 'bigThree') {
            outputHTML += `<h3>✨ Your Big Three</h3><ul>`;
            outputHTML += `<li><strong>${PLANET_SYMBOLS.Sun} Sun:</strong> ${degToSign(planetsRaw.Sun.lon).sign} ${degToSign(planetsRaw.Sun.lon).degree}°</li>`;
            outputHTML += `<li><strong>${PLANET_SYMBOLS.Moon} Moon:</strong> ${degToSign(planetsRaw.Moon.lon).sign} ${degToSign(planetsRaw.Moon.lon).degree}°</li>`;
            outputHTML += `<li><strong>🔮 Ascendant:</strong> ${degToSign(ascendant).sign} ${degToSign(ascendant).degree}°</li>`;
            outputHTML += `</ul>`;
          } else {
            outputHTML += `<h3>🪐 Planetary Positions</h3><ul>`;
            for (const [key, planet] of Object.entries(planetsRaw)) {
              const sign = degToSign(planet.lon);
              outputHTML += `<li><strong>${PLANET_SYMBOLS[key]} ${key}:</strong> ${sign.sign} ${sign.degree}°</li>`;
            }
            outputHTML += `</ul>`;

            outputHTML += `<h3>🏠 House Cusps</h3><ul>`;
            for (let i = 1; i <= 12; i++) {
              outputHTML += `<li>House ${i}: ${houses[i].sign} ${houses[i].degree}°</li>`;
            }
            outputHTML += `</ul>`;
          }

          // Chart pattern
          outputHTML += `<h3>🎯 Chart Pattern</h3><p>${chartPattern}</p>`;

          // Aspects
          outputHTML += `<h3>⚡ Major Aspects</h3>`;
          if (aspects.length === 0) {
            outputHTML += `<p>No major aspects found within orb.</p>`;
          } else {
            outputHTML += `<div class="aspect-list"><ul>`;
            for (const asp of aspects) {
              const exactText = asp.exact ? ' (Exact!)' : '';
              outputHTML += `<li style="color: ${asp.color};">
                ${PLANET_SYMBOLS[asp.p1]} ${asp.p1} ${asp.symbol} ${PLANET_SYMBOLS[asp.p2]} ${asp.p2} 
                <small>(${asp.orb}° orb${exactText})</small>
              </li>`;
            }
            outputHTML += `</ul></div>`;
          }

          elements.resultsDiv.innerHTML = outputHTML;

          // Draw charts
          elements.chartContainer.style.display = 'flex';
          elements.chartDesc.style.display = 'block';
          
          const ctx = elements.canvas.getContext('2d');
          const wheelImg = new Image();
          wheelImg.crossOrigin = "anonymous";
          
          wheelImg.onload = function() {
            ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
            ctx.drawImage(wheelImg, 0, 0, elements.canvas.width, elements.canvas.height);
            drawChart(planetsRaw, houses, ctx);
          };
          
          wheelImg.onerror = function() {
            // Fallback: draw basic circle
            ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
            ctx.beginPath();
            ctx.arc(elements.canvas.width/2, elements.canvas.height/2, elements.canvas.width/2 - 20, 0, 2 * Math.PI);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.stroke();
            drawChart(planetsRaw, houses, ctx);
          };
          
          wheelImg.src = CONFIG.wheelImageUrl;

          // Draw sky map
          drawSkyMap(planetsRaw);

          // Setup download
          elements.downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.download = `sky-map-${date.replace(/-/g, '')}.png`;
            link.href = elements.skyCanvas.toDataURL('image/png');
            link.click();
          };

        } catch (error) {
          console.error('Chart generation error:', error);
          showError(error.message);
          elements.chartContainer.style.display = 'none';
          elements.skyContainer.style.display = 'none';
          elements.chartDesc.style.display = 'none';
        }
      });

      // Set default date to today
      const today = new Date().toISOString().split('T')[0];
      elements.birthdate.max = today;
      
    })();
  </script>

</body>
</html>
