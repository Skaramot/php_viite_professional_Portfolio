import { useEffect, useMemo, useState } from 'react';

const WEATHER_CODES = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

export default function LiveInfo() {
    const [now, setNow] = useState(new Date());
    const [weather, setWeather] = useState({ status: 'loading' });

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const loadWeather = async () => {
            try {
                const response = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=-24.6541&longitude=25.9087&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto',
                    { signal: controller.signal },
                );
                if (!response.ok) {
                    throw new Error('Weather request failed');
                }
                const data = await response.json();
                if (isMounted) {
                    setWeather({
                        status: 'ready',
                        temperature: data.current?.temperature_2m,
                        wind: data.current?.wind_speed_10m,
                        code: data.current?.weather_code,
                    });
                }
            } catch (err) {
                if (!isMounted || err.name === 'AbortError') return;
                setWeather({ status: 'error' });
            }
        };

        loadWeather();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const calendar = useMemo(() => {
        const year = now.getFullYear();
        const month = now.getMonth();
        const start = new Date(year, month, 1);
        const startDay = start.getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const cells = [];

        for (let i = 0; i < startDay; i += 1) {
            cells.push(null);
        }

        for (let day = 1; day <= daysInMonth; day += 1) {
            cells.push(day);
        }

        return {
            monthLabel: start.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
            cells,
        };
    }, [now]);

    return (
        <div className="space-y-6">
            <div className="space-y-3 rounded-2xl border border-white/20 bg-white/70 p-4 text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200">
                <p className="text-xs uppercase text-amber-700 dark:text-amber-200">Current Time</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {now.toLocaleTimeString()}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-300">
                    {now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <div className="mt-3 rounded-xl border border-white/15 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-slate-900/50">
                    <p className="text-xs uppercase text-amber-700 dark:text-amber-200">Weather</p>
                    {weather.status === 'loading' && (
                        <p className="mt-2 text-slate-500 dark:text-slate-300">Loading weather...</p>
                    )}
                    {weather.status === 'error' && (
                        <p className="mt-2 text-rose-600 dark:text-rose-300">
                            Weather unavailable.
                        </p>
                    )}
                    {weather.status === 'ready' && (
                        <div className="mt-2 space-y-1 text-slate-700 dark:text-slate-200">
                            <p>{WEATHER_CODES[weather.code] || 'Current conditions'}</p>
                            <p>{weather.temperature}°C · Wind {weather.wind} km/h</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
                <p className="text-xs uppercase text-amber-700 dark:text-amber-200">Calendar</p>
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        {calendar.monthLabel}
                    </p>
                </div>
                <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs uppercase text-slate-400">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <span key={day}>{day}</span>
                    ))}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-2 text-center text-sm text-slate-700 dark:text-slate-200">
                    {calendar.cells.map((day, index) => {
                        const isToday =
                            day === now.getDate() &&
                            now.getMonth() === new Date().getMonth() &&
                            now.getFullYear() === new Date().getFullYear();
                        return (
                            <span
                                key={`${day ?? 'empty'}-${index}`}
                                className={`flex h-8 items-center justify-center rounded-full ${
                                    day
                                        ? isToday
                                            ? 'bg-amber-400 text-amber-950'
                                            : 'bg-white/60 dark:bg-slate-900/50'
                                        : ''
                                }`}
                            >
                                {day ?? ''}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
