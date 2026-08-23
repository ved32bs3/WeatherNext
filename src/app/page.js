"use client";
import { useEffect, useState } from "react";

const getConditionIcon = (condition = "") => {
  const value = condition.toLowerCase();

  if (value.includes("clear")) return "fa-solid fa-sun";
  if (value.includes("cloud")) return "fa-solid fa-cloud";
  if (value.includes("rain") || value.includes("drizzle")) return "fa-solid fa-cloud-rain";
  if (value.includes("storm") || value.includes("thunder")) return "fa-solid fa-bolt";
  if (value.includes("mist") || value.includes("smoke") || value.includes("haze")) return "fa-solid fa-smog";

  return "fa-solid fa-cloud-sun";
};

const formatTime = (timestamp, timezone = 0) => {
  if (!timestamp) return "N/A";

  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString([], {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Home() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);

  const getWeather = async (city) => {
    try {
      const query = city === "" ? "London" : city;
      const res = await fetch(`/api/weather?city=${query}`);
      const weatherData = await res.json();

      if (!res.ok || weatherData.cod === "404") {
        throw new Error(weatherData.message || "Weather fetch failed");
      }

      setWeather(weatherData);
    } catch (error) {
      console.error("Error in fetching weather data from Weather-Stack", error);
      setWeather({ error: "Failed to fetch weather data" });
    }
  };

  useEffect(() => {
    getWeather("London");
  }, []);

  const stats =
    weather && !weather.error
      ? [
        {
          key: "temp",
          label: "Temperature",
          value: `${((weather.main?.temp ?? 0) - 273.15).toFixed(1)}°C`,
          icon: "fa-solid fa-temperature-high",
        },
        {
          key: "feelsLike",
          label: "Feels Like",
          value: `${((weather.main?.feels_like ?? 0) - 273.15).toFixed(1)}°C`,
          icon: "fa-solid fa-temperature-half",
        },
        {
          key: "humidity",
          label: "Humidity",
          value: `${weather.main?.humidity ?? 0}%`,
          icon: "fa-solid fa-droplet",
        },
        {
          key: "wind",
          label: "Wind Speed",
          value: `${weather.wind?.speed ?? 0} m/s`,
          icon: "fa-solid fa-wind",
        },
        {
          key: "cloud",
          label: "Cloud",
          value: `${weather.clouds?.all ?? 0}%`,
          icon: "fa-solid fa-cloud",
        },
        {
          key: "pressure",
          label: "Pressure",
          value: `${weather.main?.pressure ?? 0} hPa`,
          icon: "fa-solid fa-gauge-high",
        },
        {
          key: "sunrise",
          label: "Sunrise",
          value: formatTime(weather.sys?.sunrise, weather.timezone),
          icon: "fa-solid fa-sun",
        },
        {
          key: "sunset",
          label: "Sunset",
          value: formatTime(weather.sys?.sunset, weather.timezone),
          icon: "fa-solid fa-moon",
        },
        {
          key: "visibility",
          label: "Visibility",
          value: `${(weather.visibility ?? 0) / 1000} km`,
          icon: "fa-solid fa-eye",
        }
      ]
      : [];

  const cityLabel = weather && !weather.error ? weather.name : "Weather App";
  const weatherMain = weather && !weather.error ? weather.weather?.[0]?.main : "Clear";
  const weatherDescription =
    weather && !weather.error ? weather.weather?.[0]?.description || "weather" : "Search for a city";
  const tempMin = weather && !weather.error ? `${((weather.main?.temp_min ?? 0) - 273.15).toFixed(1)}°C` : "--";
  const tempMax = weather && !weather.error ? `${((weather.main?.temp_max ?? 0) - 273.15).toFixed(1)}°C` : "--";

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-950 via-blue-900 to-indigo-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/15 bg-slate-900/60 p-5 shadow-2xl backdrop-blur-md md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-sky-500/20 shadow-lg shadow-sky-900/50">
              <img
                src="/weather-icon.svg"
                alt="WeatherNext logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-200">
                Live forecast
              </div>
              <h2 className="text-2xl font-bold tracking-tight">WeatherNext</h2>
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <div className="flex gap-3">
                <input
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  type="text"
                  placeholder="Enter city name"
                  className="flex-1 rounded-xl border border-sky-200/30 bg-slate-800/80 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-sky-400"
                />
                <button
                  type="button"
                  onClick={() => getWeather(cityName)}
                  className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400"
                >
                  <i className="fa-solid fa-magnifying-glass mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          {weather && !weather.error ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 rounded-2xl bg-slate-950/50 p-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sky-200">
                    <i className="fa-solid fa-location-dot" />
                    <span className="text-sm uppercase tracking-[0.2em]">Current location</span>
                  </div>
                  <h1 className="text-3xl font-bold md:text-4xl">{cityLabel}</h1>
                  <p className="mt-2 capitalize text-slate-300">{weatherDescription}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-700/20 text-3xl text-sky-200">
                    <i className={getConditionIcon(weatherMain)} />
                  </div>
                  <div>
                    <div className="text-4xl font-bold">
                      {((weather.main?.temp ?? 0) - 273.15).toFixed(1)}°C
                    </div>
                    <div className="text-sm text-slate-300">{weatherMain}</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl bg-slate-500/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sky-200">
                    <i className="fa-solid fa-arrow-down" />
                    <span className="text-sm">Min</span>
                  </div>
                  <div className="text-xl font-semibold">{tempMin}</div>
                </div>

                <div className="rounded-2xl bg-slate-500/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sky-200">
                    <i className="fa-solid fa-arrow-up" />
                    <span className="text-sm">Max</span>
                  </div>
                  <div className="text-xl font-semibold">{tempMax}</div>
                </div>

                <div className="rounded-2xl bg-slate-500/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sky-200">
                    <i className="fa-solid fa-wind" />
                    <span className="text-sm">Wind Direction</span>
                  </div>
                  <div className="text-xl font-semibold">{weather.wind?.deg ?? 0}°</div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-sky-900/40 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-200">
                        <i className={item.icon} />
                      </div>
                      <span className="text-sm text-slate-300">{item.label}</span>
                    </div>
                    <strong className="text-base font-semibold">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-sky-300/40 bg-slate-800/40 p-8 text-center text-slate-200">
              No weather data yet. Search for a city to begin.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
