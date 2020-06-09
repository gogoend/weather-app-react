import React from 'react'
import { get,post  } from '../../api'

async function getWeather(cityCode) {
    let data = await get('http://restapi.amap.com/v3/weather/weatherInfo', {
        key: '516786aa1da89347ad99cc19c24488ac',
        city: cityCode,
        extensions: 'all'
    })
    console.log(data)
    return data
}

const cityList = [
    {
        city: '北京',
        code: 110000
    },
    {
        city: '上海',
        code: 310000
    },
    {
        city: '成都',
        code: 510100
    },
    {
        city: '三沙',
        code: 460300
    },
    {
        city: '深圳',
        code: 440300
    },
    {
        city: '厦门',
        code: 350200
    },
    {
        city: '广州',
        code: 440100
    },
    {
        city: '重庆',
        code: 500000
    },
    {
        city: '杭州',
        code: 330100
    },
    {
        city: '拉萨',
        code: 540100
    }
]

// 天气组件
export default class WeatherPage extends React.Component {
    constructor(prop) {
        super()
        this.state = {
            city: 110000,
            weatherInfo: {
                forecasts: [[]]
            },
            cachedInfo: {}
        }
    }
    async componentWillMount() {
        // let weatherInfo = await getWeather()
        // console.log(weatherInfo)
        let { city } = this.state

        await this.cityChange(city)
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
            city: newCity,
            weatherInfo: newInfo
        })
    }

    render() {
        let { city, weatherInfo } = this.state
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

        let cityOptionDOM = cityList.map((item, index) => {
            return (
                <option key={index} value={item.code}>{item.city}</option>
            )
        })

        return (
            <div>
                <select onChange={this.cityChange} value={city}>
                    {cityOptionDOM}
                </select>
                <section className="weather-app-container">
                    <ul>
                        {forecastDOM}
                    </ul>
                </section>
            </div>
        )
    }
    // componentWillReceiveProps(nextProps) { }
    // shouldComponentUpdate(nextProps, nextState) { }
    // componentWillUpdate(nextProps, nextState) { }
    // componentDidUpdate(prevProps, prevState) { }
}

