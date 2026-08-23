# Weather App

A modern weather dashboard built using Next.js and Tailwind CSS. It fetches live weather data for any city and displays detailed information such as temperature, feels like, humidity, wind speed, visibility, pressure, sunrise, and sunset. The OpenWeatherMap API is used to fetch the data.

> Online link for the project preview: https://weather-next-chi.vercel.app/

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
