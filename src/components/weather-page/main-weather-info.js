import React from 'react'
import style from '../../style/components/weather-page/main-weather-info.module.css'
import { SunnyIcon } from '../../components/weather-page/embed-svg-icon/weather-icon.js'

class MainWeatherInfo extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    componentWillReceiveProps(nextProps) {
        this.render()
    }

    render() {
        if(!this.props){
            return
        }
        let weatherInfo = this.props['weather-info']
        /*
        {"date":"2020-06-14","week":"7","dayweather":"晴","nightweather":"晴","daytemp":"34","nighttemp":"22","daywind":"西南","nightwind":"西南","daypower":"≤3","nightpower":"≤3"}
        */

        return (
                (value) => {
                    console.log(value)
                return (
                <div className={style.wrap}>
                    <aside className={style["weather-icon"]}>
                        <SunnyIcon />
                    </aside>
                    <section className={style['weather-detail']}>
                        <div className={style['describe']}>
                            <h1>{weatherInfo.dayweather}</h1>
                            <span className={style['temperature']}>{weatherInfo.daytemp}℃</span>
                        </div>
                        <div className={style['wind-info']}>
                            {weatherInfo.daywind} {weatherInfo.daypower}
                        </div>
    
                    </section>
                </div>)
                }
        )
    }
    
}

export default MainWeatherInfo