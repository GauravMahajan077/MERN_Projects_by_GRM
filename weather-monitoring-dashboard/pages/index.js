//pages/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const apikey = "feff206daa60b539abe8fae8f2ab7f29";

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        getUserLocationWeather();
    }, []);

    // Get background color based on temperature
    const getBackgroundColor = (temp) => {
        if (temp >= 30) {
            // Hot - Reds/Oranges
            return 'from-red-500 to-orange-500';
        } else if (temp >= 20) {
            // Warm - Oranges/Yellows
            return 'from-orange-400 to-yellow-400';
        } else if (temp >= 10) {
            // Mild - Yellows/Greens
            return 'from-yellow-300 to-green-300';
        } else if (temp >= 0) {
            // Cool - Greens/Blues
            return 'from-green-400 to-blue-400';
        } else {
            // Cold - Blues/Purples
            return 'from-blue-500 to-purple-500';
        }
    };

    const getUserLocationWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
                    await fetchWeatherData(url);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    // Default to London if location access is denied
                    searchByCityName('London');
                },
                {
                    timeout: 10000,
                    enableHighAccuracy: false
                }
            );
        } else {
            // Default to London if geolocation is not supported
            searchByCityName('London');
        }
    };

    const fetchWeatherData = async (url) => {
        setLoading(true);
        setError('');
        
        try {
            console.log('Fetching weather data from:', url);
            const response = await axios.get(url, {
                timeout: 10000 // 10 second timeout
            });
            
            if (!response || !response.data) {
                throw new Error('Invalid response from weather service');
            }
            
            const data = response.data;
            console.log('Weather data received:', data);
            
            // Validate essential weather data
            if (!data.name || !data.main || typeof data.main.temp === 'undefined') {
                throw new Error('Incomplete weather data received');
            }
            
            setWeatherData(data);
            setRetryCount(0); // Reset retry count on success
            
            // Fetch forecast data separately with error handling
            try {
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}&units=metric`;
                console.log('Fetching forecast data from:', forecastUrl);
                
                const forecastResponse = await axios.get(forecastUrl, {
                    timeout: 10000 // 10 second timeout
                });
                
                if (!forecastResponse || !forecastResponse.data || !forecastResponse.data.list) {
                    throw new Error('Invalid forecast response');
                }
                
                console.log('Forecast data received:', forecastResponse.data);
                setForecastData(forecastResponse.data);
            } catch (forecastError) {
                console.error('Error fetching forecast data:', forecastError);
                // Set forecast data to null but don't show error if weather data is available
                setForecastData(null);
                
                // Handle specific forecast errors
                if (forecastError.response) {
                    if (forecastError.response.status === 404) {
                        // This is unexpected but not critical
                        console.warn('Forecast data not available for this location');
                    } else if (forecastError.response.status === 429) {
                        setError('Too many requests. Please wait a moment and try again.');
                    } else {
                        setError(`Forecast service temporarily unavailable. Showing current weather only.`);
                    }
                } else if (forecastError.request) {
                    setError('Network issue with forecast service. Showing current weather only.');
                } else {
                    setError('Issue retrieving forecast data. Showing current weather only.');
                }
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            
            // Handle different types of errors
            if (error.code === 'ECONNABORTED') {
                setError('Request timeout. Please check your internet connection and try again.');
            } else if (error.response) {
                // Server responded with error status
                switch (error.response.status) {
                    case 401:
                        setError('Invalid API key. Weather service configuration error.');
                        break;
                    case 404:
                        setError('City not found. Please check the city name and try again.');
                        break;
                    case 429:
                        // Implement retry logic for rate limiting
                        if (retryCount < 3) {
                            setError(`Rate limited. Retrying in ${2 ** retryCount} seconds...`);
                            setTimeout(() => {
                                setRetryCount(prev => prev + 1);
                                fetchWeatherData(url);
                            }, 2 ** retryCount * 1000);
                            return;
                        } else {
                            setError('Too many requests. Please wait a few minutes and try again.');
                        }
                        break;
                    case 500:
                    case 502:
                    case 503:
                    case 504:
                        setError('Weather service temporarily unavailable. Please try again later.');
                        break;
                    default:
                        setError(`Weather service error (${error.response.status}). Please try again.`);
                }
            } else if (error.request) {
                // Network error
                setError('Network error. Please check your internet connection and try again.');
            } else {
                // Other error
                setError('Failed to fetch weather data. Please try again.');
            }
            
            // Clear data on critical errors
            if (error.response && error.response.status !== 429) {
                setWeatherData(null);
                setForecastData(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const searchByCityName = async (cityName) => {
        if (!cityName && !city) {
            setError('Please enter a city name');
            return;
        }
        
        const searchCity = cityName || city;
        
        // Basic validation
        if (searchCity.trim().length < 2) {
            setError('City name must be at least 2 characters');
            return;
        }
        
        const urlsearch = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(searchCity)}&appid=${apikey}&units=metric`;
        await fetchWeatherData(urlsearch);
        setCity('');
    };

    const getTime = (timestamp) => {
        try {
            return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });
        } catch (error) {
            console.error('Error formatting time:', error);
            return 'Invalid time';
        }
    };

    const getDay = (timestamp) => {
        try {
            return new Date(timestamp * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };

    const getHourlyForecast = () => {
        if (!forecastData || !forecastData.list) return [];
        return forecastData.list.slice(0, 5);
    };

    const getDailyForecast = () => {
        if (!forecastData || !forecastData.list) return [];
        const daily = [];
        for (let i = 0; i < forecastData.list.length; i += 8) {
            // Validate each forecast item
            if (forecastData.list[i] && 
                forecastData.list[i].main && 
                forecastData.list[i].weather &&
                forecastData.list[i].weather[0]) {
                daily.push(forecastData.list[i]);
            }
            if (daily.length >= 4) break; // Limit to 4 days
        }
        return daily;
    };

    // Get temperature for background color calculation
    const getCurrentTemp = () => {
        if (weatherData && weatherData.main && typeof weatherData.main.temp !== 'undefined') {
            return weatherData.main.temp;
        }
        return 20; // default
    };

    const temp = getCurrentTemp();
    const bgColor = getBackgroundColor(temp);

    // Retry function for failed requests
    const handleRetry = () => {
        setError('');
        if (weatherData && weatherData.name) {
            searchByCityName(weatherData.name);
        } else {
            getUserLocationWeather();
        }
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${bgColor} p-4 md:p-8 transition-all duration-1000`}>
            <div className="max-w-6xl mx-auto">
                <div className="header flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-black drop-shadow-lg">Weather Monitoring Dashboard</h1>
                    <div className="flex gap-2 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="Enter city name"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="flex-grow px-4 py-2 rounded-lg text-black placeholder-black placeholder-opacity-70 border-2 border-black shadow-[8px_8px_0_0_#000] focus:outline-none focus:shadow-[4px_4px_0_0_#000] transition-shadow"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                            onKeyDown={(e) => e.key === 'Enter' && searchByCityName()}
                        />
                        <button 
                            onClick={() => searchByCityName()} 
                            disabled={loading}
                            className="px-6 py-2 bg-white text-black font-bold border-2 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '...' : 'Search'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-200 border-2 border-black text-black px-4 py-3 rounded-lg mb-6 shadow-[4px_4px_0_0_#000]">
                        <div className="flex justify-between items-start">
                            <div>{error}</div>
                            <button 
                                onClick={handleRetry}
                                className="ml-4 px-3 py-1 bg-black text-white text-sm font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mb-4"></div>
                        <p className="text-black font-bold">Loading weather data...</p>
                    </div>
                ) : weatherData ? (
                    <>
                        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Current Weather */}
                            <div className="lg:col-span-1 bg-white rounded-2xl p-6 border-2 border-black shadow-[12px_12px_0_0_#000]">
                                <h2 className="text-xl font-bold text-black mb-2">
                                    {weatherData.name}, {weatherData.sys?.country || 'N/A'}
                                </h2>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-5xl font-bold text-black">
                                            {Math.round(weatherData.main?.temp || 0)}°C
                                        </p>
                                        <p className="text-black capitalize mt-1">
                                            {weatherData.weather?.[0]?.description || 'N/A'}
                                        </p>
                                    </div>
                                    {weatherData.weather?.[0]?.icon && (
                                        <img 
                                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                                            alt={weatherData.weather[0].description}
                                            className="w-20 h-20 filter invert"
                                        />
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-gray-100 rounded-lg p-3 border-2 border-black">
                                        <p className="text-black text-sm">Feels Like</p>
                                        <p className="text-black font-bold text-lg">
                                            {Math.round(weatherData.main?.feels_like || 0)}°C
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-3 border-2 border-black">
                                        <p className="text-black text-sm">Humidity</p>
                                        <p className="text-black font-bold text-lg">
                                            {weatherData.main?.humidity || 'N/A'}%
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-3 border-2 border-black">
                                        <p className="text-black text-sm">Wind Speed</p>
                                        <p className="text-black font-bold text-lg">
                                            {weatherData.wind?.speed || 'N/A'} m/s
                                        </p>
                                    </div>
                                    <div className="bg-gray-100 rounded-lg p-3 border-2 border-black">
                                        <p className="text-black text-sm">Pressure</p>
                                        <p className="text-black font-bold text-lg">
                                            {weatherData.main?.pressure || 'N/A'} hPa
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hourly Forecast */}
                            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border-2 border-black shadow-[12px_12px_0_0_#000]">
                                <h3 className="text-lg font-bold text-black mb-4">Hourly Forecast</h3>
                                {forecastData ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                                        {getHourlyForecast().map((hour, index) => (
                                            <div key={index} className="text-center bg-gray-100 rounded-lg p-3 border-2 border-black">
                                                <p className="text-black text-sm">
                                                    {getTime(hour.dt)}
                                                </p>
                                                {hour.weather?.[0]?.icon && (
                                                    <img 
                                                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                                                        alt={hour.weather[0].description}
                                                        className="w-12 h-12 mx-auto filter invert"
                                                    />
                                                )}
                                                <p className="text-black font-bold">
                                                    {Math.round(hour.main?.temp || 0)}°C
                                                </p>
                                                <p className="text-black text-xs mt-1 capitalize">
                                                    {hour.weather?.[0]?.description || 'N/A'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-black text-center py-4">Forecast data unavailable</p>
                                )}
                            </div>
                        </main>

                        {/* Daily Forecast */}
                        <div className="bg-white rounded-2xl p-6 border-2 border-black shadow-[12px_12px_0_0_#000]">
                            <h3 className="text-lg font-bold text-black mb-4">5-Day Forecast</h3>
                            {forecastData ? (
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {getDailyForecast().map((day, index) => (
                                        <div key={index} className="bg-gray-100 rounded-lg p-4 border-2 border-black">
                                            <p className="text-black font-bold">
                                                {getDay(day.dt)}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                {day.weather?.[0]?.icon && (
                                                    <img 
                                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                                                        alt={day.weather[0].description}
                                                        className="w-10 h-10 filter invert"
                                                    />
                                                )}
                                                <div className="text-right">
                                                    <p className="text-black font-bold">
                                                        {Math.round(day.main?.temp_max || 0)}°
                                                    </p>
                                                    <p className="text-black text-sm">
                                                        {Math.round(day.main?.temp_min || 0)}°
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-black text-xs mt-2 capitalize">
                                                {day.weather?.[0]?.description || 'N/A'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-black text-center py-4">Forecast data unavailable</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-black text-xl drop-shadow-lg mb-4">Enter a city name to get weather information</p>
                        <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => searchByCityName('London')} 
                                className="px-4 py-2 bg-white text-black font-bold border-2 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-all"
                            >
                                Try London
                            </button>
                            <button 
                                onClick={() => searchByCityName('New York')} 
                                className="px-4 py-2 bg-white text-black font-bold border-2 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-all"
                            >
                                Try New York
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;