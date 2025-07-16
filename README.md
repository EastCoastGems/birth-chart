# Astro Birth Chart

A web app for generating astrology birth charts using Swiss Ephemeris (Node.js backend) and AstroChart.js (frontend).

## Features

- Calculates planets, houses, and ascendant using Swiss Ephemeris
- Interactive birth chart wheel with AstroChart.js
- Geocoding with OpenCage API
- Downloadable sky map

## Setup

### Backend

1. Install dependencies:
    ```sh
    npm install
    ```
2. Start the backend server:
    ```sh
    node server.js
    ```
   The backend runs on [http://localhost:3001](http://localhost:3001).

### Frontend

1. Serve the frontend with a local web server (from the folder containing `test.html`):
    ```sh
    npx serve .
    ```
    or
    ```sh
    python -m http.server 8080
    ```
2. Open [http://localhost:3000/test.html](http://localhost:3000/test.html) (or the port shown) in your browser.

## Usage

- Enter your birth date, time, and location.
- Choose "Big Three" or "Full Chart".
- Click "Generate Chart" to see your astrology chart and sky map.

## Requirements

- Node.js (v20 recommended)
- Python (optional, for serving frontend)
- Visual Studio Build Tools (for native module compilation)
- OpenCage API key (replace in `test.html`)

## License

MIT

---

**Let me know if you want a more detailed README or want to include screenshots or
