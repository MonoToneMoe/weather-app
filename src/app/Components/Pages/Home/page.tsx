"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import sun from "@/assets/imgs/02d@2x.png";
import bookmarkOpen from "@/assets/imgs/bookmark-open.png";
import bookarkClosed from "@/assets/imgs/bookmark-closed.png";
import searchIcon from "@/assets/imgs/search-icon.png";
import { Dropdown, DropdownItem, Navbar, NavbarBrand } from "flowbite-react";
import { Imprima } from "next/font/google";
import Image from "next/image";
import _01d from "@/assets/imgs/01d@2x.png";
import _01n from "@/assets/imgs/01n@2x.png";
import _02d from "@/assets/imgs/02d@2x.png";
import _02n from "@/assets/imgs/02n@2x.png";
import _03d from "@/assets/imgs/03d@2x.png";
import _03n from "@/assets/imgs/03n@2x.png";
import _04d from "@/assets/imgs/04d@2x.png";
import _04n from "@/assets/imgs/04n@2x.png";
import _09d from "@/assets/imgs/09d@2x.png";
import _09n from "@/assets/imgs/09n@2x.png";
import _10d from "@/assets/imgs/10d@2x.png";
import _10n from "@/assets/imgs/10n@2x.png";
import _11d from "@/assets/imgs/11d@2x.png";
import _11n from "@/assets/imgs/11n@2x.png";
import _13d from "@/assets/imgs/13d@2x.png";
import _13n from "@/assets/imgs/13n@2x.png";
import _50d from "@/assets/imgs/50d@2x.png";
import _50n from "@/assets/imgs/50n@2x.png";
import {
  getMyFiveDayForecast,
  getMyLocation,
  getMyWeather,
  getSearchFiveDayForecast,
  getSearchWeather,
  myFiveDayForecastData,
  myLocationData,
  myWeatherData,
} from "@/utils/DataServices";
import { ICurrentWeatherData, IImageMap } from "@/app/Interfaces/Interfaces";

const HomeComponent = () => {

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentMinWeather, setCurrentMinWeather] = useState(Number);
  const [currentMaxWeather, setCurrentMaxWeather] = useState(Number);
  const [currentWeatherImg, setCurrentWeatherImg] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");

  const [oneDayDate, setOneDayDate] = useState("");
  const [twoDayDate, setTwoDayDate] = useState("");
  const [threeDayDate, setThreeDayDate] = useState("");
  const [fourDayDate, setFourDayDate] = useState("");
  const [fiveDayDate, setFiveDayDate] = useState("");

  const [oneDayTempMin, setOneDayTempMin] = useState(Number);
  const [twoDayTempMin, setTwoDayTempMin] = useState(Number);
  const [threeDayTempMin, setThreeDayTempMin] = useState(Number);
  const [fourDayTempMin, setFourDayTempMin] = useState(Number);
  const [fiveDayTempMin, setFiveDayTempMin] = useState(Number);

  const [oneDayTempMax, setOneDayTempMax] = useState(Number);
  const [twoDayTempMax, setTwoDayTempMax] = useState(Number);
  const [threeDayTempMax, setThreeDayTempMax] = useState(Number);
  const [fourDayTempMax, setFourDayTempMax] = useState(Number);
  const [fiveDayTempMax, setFiveDayTempMax] = useState(Number);

  const [oneDayIcon, setOneDayIcon] = useState("");
  const [twoDayIcon, setTwoDayIcon] = useState("");
  const [threeDayIcon, setThreeDayIcon] = useState("");
  const [fourDayIcon, setFourDayIcon] = useState("");
  const [fiveDayIcon, setFiveDayIcon] = useState("");

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    getSearchWeather(inputValue.toLowerCase());
    getSearchFiveDayForecast(inputValue.toLowerCase());
    const forecastData = myFiveDayForecastData();
    const weatherData = myWeatherData();
    setCity(weatherData.name);
    setCountry(weatherData.country);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setDate(
      new Date(weatherData.dt * 1000).toLocaleDateString("en-US", options)
    );
    setCurrentWeather(weatherData.temp.toString());
    setCurrentMinWeather(weatherData.temp_min);
    setCurrentMaxWeather(weatherData.temp_max);
    setCurrentWeatherImg(weatherData.icon);
    setCurrentDescription(weatherData.description);

    setOneDayDate(
      new Date(forecastData.list[0].dt).toLocaleDateString("en-US", {
        weekday: "short",
      })
    );
    setOneDayTempMin(forecastData.list[0].temp_min);
    setOneDayTempMax(forecastData.list[0].temp_max);
    setOneDayIcon(forecastData.list[0].icon);
  };

  const imageMap: IImageMap = {
    "01d": _01d.src,
    "02d": _02d.src,
    "03d": _03d.src,
    "04d": _04d.src,
    "09d": _09d.src,
    "10d": _10d.src,
    "11d": _11d.src,
    "13d": _13d.src,
    "50d": _50d.src,
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMyLocation();

      if (myLocationData()) {
        await getMyWeather();
        const weatherData = await myWeatherData();
        setCity(weatherData.name);
        setCountry(weatherData.country);
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        setDate(
          new Date(weatherData.dt * 1000).toLocaleDateString("en-US", options)
        );
        setCurrentWeather(weatherData.temp.toString());
        setCurrentMinWeather(weatherData?.temp_min);
        setCurrentMaxWeather(weatherData?.temp_max);
        setCurrentWeatherImg(weatherData?.icon);
        setCurrentDescription(weatherData?.description);

        await getMyFiveDayForecast();
        const forecastData = myFiveDayForecastData();

        setOneDayDate(
          new Date(forecastData?.list[0]?.dt * 1000).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          )
        );
        setOneDayTempMin(forecastData?.list[0]?.temp_min);
        setOneDayTempMax(forecastData?.list[0]?.temp_max);
        setOneDayIcon(forecastData?.list[0]?.icon);

        setTwoDayDate(
          new Date(forecastData?.list[1]?.dt * 1000).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          )
        );
        setTwoDayTempMin(forecastData?.list[1]?.temp_min);
        setTwoDayTempMax(forecastData?.list[1]?.temp_max);
        setTwoDayIcon(forecastData?.list[1]?.icon);

        setThreeDayDate(
          new Date(forecastData?.list[2]?.dt * 1000).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          )
        );
        setThreeDayTempMin(forecastData?.list[2]?.temp_min);
        setThreeDayTempMax(forecastData?.list[2]?.temp_max);
        setThreeDayIcon(forecastData?.list[2]?.icon);

        setFourDayDate(
          new Date(forecastData?.list[3]?.dt * 1000).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          )
        );
        setFourDayTempMin(forecastData?.list[3]?.temp_min);
        setFourDayTempMax(forecastData?.list[3]?.temp_max);
        setFourDayIcon(forecastData?.list[3]?.icon);

        setFiveDayDate(
          new Date(forecastData?.list[4]?.dt * 1000).toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          )
        );
        setFiveDayTempMin(forecastData?.list[4]?.temp_min);
        setFiveDayTempMax(forecastData?.list[4]?.temp_max);
        setFiveDayIcon(forecastData?.list[4]?.icon);
      }
    };

    fetchData();
  }, [myLocationData()]);

  return (
    <>
      <div className="bg-transparent navbar flex justify-between items-center">
        <div className="flex items-center">
          <img src={sun.src} alt="" />
          <h1 className="text-white">Weather Man Weather</h1>
        </div>
        <div className="flex h-16 items-center">
          <div className="h-16 w-16 rounded-full searchColor border-black border-solid border-x border-y button-border flex justify-center items-center">
            <Dropdown
              className="rounded-full searchColor bg-transparent"
              id="hide-arrow"
              label={<img className="h-11" src={bookmarkOpen.src} alt="" />}
              inline
            >
              <div className="flex flex-col justify-center items-center">
                <DropdownItem>Text 1</DropdownItem>
                <DropdownItem>Text 2</DropdownItem>
                {/* Add more DropdownItems as needed */}
              </div>
            </Dropdown>
          </div>

          <div className="searchColor flex items-center rounded-full border-solid border-black border-x border-y h-16">
            <div className="flex flex-1 rounded-full border-black border-solid border-x border-y">
              <button
                className="rounded-full border-solid border-black border-l-0 border-r-2 border-y-2 w-16 h-16 p-2"
                onClick={handleButtonClick}
              >
                <img src={searchIcon.src} alt="" />
              </button>

              <input
                className="p-0 pl-1 text-2xl text-black flex-1 bg-transparent rounded-r-full outline-none border-transparent border-y focus:border-transparent focus:outline-none"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col gap-8 my-6">
        <div className=" w-full custom-shadow">
          <div className="header-color flex items-center justify-between p-4">
            <h1 className="text-black text-7xl font-bold">
              {city && country ? `${city}, ${country}` : null}
            </h1>
            <h1 className="text-black text-7xl font-bold">{date}</h1>
          </div>
          <div className="body-color flex items-center justify-between p-4 gap-4">
            <div className=" w-6/12 pr-72">
              <div className="flex items-center h-6/12 gap-8">
                <img
                  className="h-60"
                  src={
                    imageMap[currentWeatherImg]
                      ? imageMap[currentWeatherImg]
                      : ""
                  }
                  alt={imageMap[currentWeatherImg]}
                />
                <h1 className="text-black text-9xl">
                  {currentWeather ? `${currentWeather}°F` : ""}
                </h1>
              </div>
              <div className="flex text-black items-center justify-between text-3xl h-6/12">
                <p className="font-bold">{currentDescription}</p>
                <p className="font-bold">
                  {currentMaxWeather ? `Max: ${currentMaxWeather}` : ""}
                </p>
                <p className="font-bold">
                  {currentMinWeather ? `Min: ${currentMinWeather}` : ""}
                </p>
              </div>
            </div>
            <div className="w-6/12">
              <canvas className="chart w-full"></canvas>
            </div>
          </div>
        </div>

        <div className="w-full custom-shadow">
          <div className="header-color flex text-left">
            <h1 className="text-2xl font-bold text-black">
              This Week's Weather
            </h1>
          </div>
          <div className="body-color flex-col flex items-center justify-around md:flex-row">
            <div className="flex flex-col justify-center items-center gap-6 py-6">
              <img
                src={imageMap[oneDayIcon] ? imageMap[oneDayIcon] : ""}
                alt={oneDayIcon}
                className=" h-24"
              />
              <h3 className="text-black text-center text-2xl font-bold">
                {oneDayDate}
              </h3>
              <p className="text-black text-center text-2xl font-semibold">
                {oneDayTempMax && oneDayTempMin
                  ? `${oneDayTempMax}°F ${oneDayTempMin}°F`
                  : ""}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 py-6">
              <img
                src={imageMap[twoDayIcon] ? imageMap[twoDayIcon] : ""}
                alt={twoDayIcon}
                className=" h-24"
              />
              <h3 className="text-black text-center text-2xl font-bold">
                {twoDayDate}
              </h3>
              <p className="text-black text-center text-2xl font-semibold">
                {twoDayTempMax && oneDayTempMin
                  ? `${twoDayTempMax}°F ${twoDayTempMin}°F`
                  : ""}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 py-6">
              <img
                src={imageMap[threeDayIcon] ? imageMap[threeDayIcon] : ""}
                alt={threeDayIcon}
                className=" h-24"
              />
              <h3 className="text-black text-center text-2xl font-bold">
                {threeDayDate}
              </h3>
              <p className="text-black text-center text-2xl font-semibold">
                {threeDayTempMax && threeDayTempMin
                  ? `${threeDayTempMax}°F ${threeDayTempMin}°F`
                  : ""}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 py-6">
              <img
                src={imageMap[fourDayIcon] ? imageMap[fourDayIcon] : ""}
                alt={fourDayIcon}
                className=" h-24"
              />
              <h3 className="text-black text-center text-2xl font-bold">
                {fourDayDate}
              </h3>
              <p className="text-black text-center text-2xl font-semibold">
                {fourDayTempMax && fourDayTempMin
                  ? `${fourDayTempMax}°F ${fourDayTempMin}°F`
                  : ""}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-6 py-6">
              <img
                src={imageMap[fiveDayIcon] ? imageMap[fiveDayIcon] : ""}
                alt={fiveDayIcon}
                className=" h-24"
              />
              <h3 className="text-black text-center text-2xl font-bold">
                {fiveDayDate}
              </h3>
              <p className="text-black text-center text-2xl font-semibold">
                {fiveDayTempMax && fiveDayTempMin
                  ? `${fiveDayTempMax}°F ${fiveDayTempMin}°F`
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
