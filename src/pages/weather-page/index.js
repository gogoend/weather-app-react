import React from 'react'

import { get} from '../../api'
import SingleWeatherInfo from '../../components/weather-page/single-weather-info'
import MainWeatherInfo from '../../components/weather-page/main-weather-info'

import style from '../../style/pages/weather-page/index.module.css'

console.log(style)

async function getWeather(cityCode) {
    let data = await get('http://restapi.amap.com/v3/weather/weatherInfo', {
        key: '516786aa1da89347ad99cc19c24488ac',
        city: cityCode,
        extensions: 'all'
    })
    console.log(data)
    return data
}

// 天气组件
export default class WeatherPage extends React.Component {
    constructor(prop) {
        super()
        this.state = {
            weatherInfo: {
                forecasts: [[]]
            },
            // currentCity:this.props.globalCurrentCity,
            cachedInfo: {}
        }
    }
    async componentWillMount() {
        // console.log(this.props)
        await this.cityChange(this.props.city.code)
    }

    cacheInfo(city, info) {
        /* eslint-disable-next-line */
        this.state.cachedInfo[city] = {
            updateTime: new Date().getTime(),
            info
        }
        this.forceUpdate();
    }

    async cityChange(e) {
        let { cachedInfo } = this.state
        let newCity = e.target ? e.target.value : e;
        let newInfo

        if (cachedInfo[newCity] && ((new Date().getTime()) - cachedInfo[newCity].updateTime) < 600000) {
            newInfo = cachedInfo[newCity].info
            // debugger
        } else {
            newInfo = await getWeather(newCity)
            this.cacheInfo(newCity, newInfo)
        }

        this.setState({
            weatherInfo: newInfo
        })
    }

    render() {
        let { weatherInfo } = this.state

        this.cityChange = this.cityChange.bind(this)

        let futureForecastDOM = []
        let todayForecast=''

        if (weatherInfo && Array.isArray(weatherInfo.forecasts[0].casts)) {
            /* eslint-disable-next-line */
            futureForecastDOM = weatherInfo.forecasts[0].casts.map((item, index) => {
                if(index===0){
                    todayForecast = item
                }else{
                    return (
                        <li key={index}>
                            <SingleWeatherInfo weather-info={item} />
                        </li>
                    )
                }
            })
        }

        return (
            <>
                <section>
                <main>
                    <MainWeatherInfo weather-info={todayForecast}></MainWeatherInfo>
                </main>
                    <ul className={style['weather-info-list']}>
                        {futureForecastDOM}
                    </ul>
                </section>
            </>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.cityChange(nextProps.city.code)
    }
}
