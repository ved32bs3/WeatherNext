# Weather App

A modern weather dashboard built using Next.js and Tailwind CSS. It fetches live weather data for any city and displays detailed information such as temperature, feels like, humidity, wind speed, visibility, pressure, sunrise, and sunset. The OpenWeatherMap API is used to fetch the data.

## Features

- Search weather by city name
- Real-time weather data from OpenWeatherMap
- Responsive weather dashboard UI
- Tailwind CSS styling
- Font Awesome icons for weather and metrics
- Weather details including:
  - Temperature
  - Feels like
  - Humidity
  - Wind speed
  - Cloud coverage
  - Pressure
  - Visibility
  - Sunrise and sunset

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Font Awesome
- OpenWeatherMap API

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the root of the project and add your OpenWeatherMap API key:

```bash
OPENWEATHER_API_KEY=your_api_key_here
```

### 3. Run the app

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## Project Structure

```bash
src/
  app/
    api/
      weather/
        route.js
    globals.css
    layout.js
    page.js
public/
  weather-icon.svg
.env.local
README.md
```

## API Route

The app calls the internal API endpoint:

```bash
/api/weather?city=%city_name%
```

This route gives the request to OpenWeatherMap using the stored API key.

## Notes

- Make sure your OpenWeatherMap API key is valid and enabled.
- If the city is not found or the API fails, the app shows a friendly error state.

## License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
