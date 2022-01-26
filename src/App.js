// Note: WeatherApp component...!

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

let coordinates = {
    lat: 24.914162,
    lng: 67.082216,
    type: "daily"
};

const WeatherApp = () => {

    // Note: Handeling states here...!
    const [weatherArr, setWeatherArr] = useState([]);

    // Note: This function will call api...!
    const callApi = async () => {

        let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=4fcd41771cc91187db1651ddcc10916f`;

        try {
            let response = await axios({
                method: "GET",
                url: api
            });
            console.log(response);

            if (response.status == 200) {
                let data = response.data.daily;
                setWeatherArr(data);
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    // Note: When this component rendered successfully then this hook will run and call the api...!
    useEffect(() => callApi(), []);

    return (
      <React.Fragment>
          <div className='Weather'><h1>WeatherApp</h1>
            <h4>7 Days Weather Forecast</h4>
          </div>
            <div className='main-container'>
                {
                    (weatherArr && weatherArr.length > 0)
                        ?
                        (
                            weatherArr.map((item, index) => {
                                return (
                                    <div key={index}>
                                         <h1> Temperature {item.temp.day} <br/> Max Temp: {item.temp.max}  <br/> Min Temp: {item.temp.min} <hr></hr></h1>
                                    </div>
                                );
                            })
                        )
                        :
                        (
                            <h1> Data Not Found! </h1>
                        )
                }
            </div>

        </React.Fragment>
    );
}

export default WeatherApp;
