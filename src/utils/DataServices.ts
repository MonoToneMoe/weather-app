import { ICurrentWeatherData, IFiveDayForeCast, ILocation } from "@/app/Interfaces/Interfaces";
import { weatherKey, geoapifyKey } from "./apiKeys";

let myLocation: ILocation;
let myWeather: ICurrentWeatherData;
let myFiveDayForecast: IFiveDayForeCast;

export const getMyLocation = async () => {
    const promise = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${geoapifyKey}`);
    const data = await promise.json();

    myLocation = {
        latitude: data.location.latitude,
        longitude: data.location.longitude
    };

    console.log('My Location:', myLocation);

    await getMyWeather();
};

export const myLocationData = () => {
    return myLocation;
};

export const getMyWeather = async () => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${myLocation.latitude}&lon=${myLocation.longitude}&appid=${weatherKey}&units=imperial`);
    const data = await promise.json();

    myWeather = {
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temp: Math.round(data.main.temp),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        name: data.name,
        country: data.sys.country,
        dt: data.dt
    };

    console.log('My Weather:', myWeather);
};

export const getSearchWeather = async (cityInput: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${weatherKey}&units=imperial`)
    const data = await promise.json();

    myWeather = {
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temp: Math.round(data.main.temp),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        name: data.name,
        country: data.sys.country,
        dt: data.dt
    };
}


export const myWeatherData = () => {
    return myWeather;
};

export const getMyFiveDayForecast = async () => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${myLocation.latitude}&lon=${myLocation.longitude}&appid=${weatherKey}&units=imperial`);
    const data = await promise.json();

    myFiveDayForecast = {
        list: [
            {
                dt: data.list[0].dt,
                temp_min: data.list[0].main.temp_min,
                temp_max: data.list[0].main.temp_max,
                icon: data.list[0].weather[0].icon
            },
            {
                dt: data.list[1].dt,
                temp_min: data.list[1].main.temp_min,
                temp_max: data.list[1].main.temp_max,
                icon: data.list[1].weather[0].icon
            },
            {
                dt: data.list[2].dt,
                temp_min: data.list[2].main.temp_min,
                temp_max: data.list[2].main.temp_max,
                icon: data.list[2].weather[0].icon
            },
            {
                dt: data.list[3].dt,
                temp_min: data.list[3].main.temp_min,
                temp_max: data.list[3].main.temp_max,
                icon: data.list[3].weather[0].icon
            },
            {
                dt: data.list[4].dt,
                temp_min: data.list[4].main.temp_min,
                temp_max: data.list[4].main.temp_max,
                icon: data.list[4].weather[0].icon
            },
        ]
    }
}

export const getSearchFiveDayForecast = async (cityInput: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${weatherKey}&units=imperial`);
    const data = await promise.json();
    console.log(data)

    myFiveDayForecast = {
        list: [
            {
                dt: data.list[0].dt,
                temp_min: data.list[0].main.temp_min,
                temp_max: data.list[0].main.temp_max,
                icon: data.list[0].weather[0].icon
            },
            {
                dt: data.list[1].dt,
                temp_min: data.list[1].main.temp_min,
                temp_max: data.list[1].main.temp_max,
                icon: data.list[1].weather[0].icon
            },
            {
                dt: data.list[2].dt,
                temp_min: data.list[2].main.temp_min,
                temp_max: data.list[2].main.temp_max,
                icon: data.list[2].weather[0].icon
            },
            {
                dt: data.list[3].dt,
                temp_min: data.list[3].main.temp_min,
                temp_max: data.list[3].main.temp_max,
                icon: data.list[3].weather[0].icon
            },
            {
                dt: data.list[4].dt,
                temp_min: data.list[4].main.temp_min,
                temp_max: data.list[4].main.temp_max,
                icon: data.list[4].weather[0].icon
            },
        ]
    }
}

export const myFiveDayForecastData = () => {
    return myFiveDayForecast;
}