import React from 'react'
import { get,post  } from '../../api'

import style from './index.module.css'

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
    componentDidMount() { }
    componentWillUnmount() { }

    cacheInfo(city, info) {
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
        let chineseDigi = [
            '〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'
        ]

        this.cityChange = this.cityChange.bind(this)

        let forecastDOM = ''

        if (weatherInfo && Array.isArray(weatherInfo.forecasts[0].casts)) {
            forecastDOM = weatherInfo.forecasts[0].casts.map((item, index) => {
                return (
                    <li key={index}>
                        <span>{item.date} 星期{item.week === '7' ? '日' : chineseDigi[item.week]}</span>
                        <section>
                            <header>
                                白天
                                    </header>
                            <ul>
                                <li>{item.dayweather}</li>
                                <li>{item.daytemp}℃</li>
                                <li>{item.daywind}</li>
                                <li>{item.daypower}级</li>
                            </ul>
                        </section>
                        <section>
                            <header>
                                夜间
                                    </header>
                            <ul>
                                <li>{item.nightweather}</li>
                                <li>{item.nighttemp}℃</li>
                                <li>{item.nightwind}</li>
                                <li>{item.nightpower}级</li>
                            </ul>
                        </section>
                    </li>
                )
            })
        }

        return (
            <div>
                <section className={style['weather-app-container']}>
                    <ul>
                        {forecastDOM}
                    </ul>
                </section>
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.city)
        this.cityChange(nextProps.city.code)
    }
    // shouldComponentUpdate(nextProps, nextState) { }
    // componentWillUpdate(nextProps, nextState) { }
    // componentDidUpdate(prevProps, prevState) { }
}

