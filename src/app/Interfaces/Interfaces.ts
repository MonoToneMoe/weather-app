export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface ICurrentWeatherData {
    description: string;
    icon: string;
    temp: number;
    temp_min: number;
    temp_max: number;
    name: string;
    country: string;
    dt: number;
}

export interface IFiveDayForeCast {
    list: [
        {
            dt: number;
            temp_min: number;
            temp_max: number;
            icon: string;
        },
        {
            dt: number;
            temp_min: number;
            temp_max: number;
            icon: string;
        },
        {
            dt: number;
            temp_min: number;
            temp_max: number;
            icon: string;
        },
        {
            dt: number;
            temp_min: number;
            temp_max: number;
            icon: string;
        },
        {
            dt: number;
            temp_min: number;
            temp_max: number;
            icon: string;
        }
    ]
}

export interface IImageMap {
    [key: string]: string;
  }