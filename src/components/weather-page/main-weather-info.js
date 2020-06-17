import React from 'react'

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
            <div className="wrap">
                <aside className="weather-icon">
                </aside>
                <section className="weather-detail">
                    <div>
                        <h1>{weatherInfo.dayweather}</h1>
                        <span>{weatherInfo.daytemp}℃</span>
                    </div>
                    <div className="wind-info">
                        {weatherInfo.daywind} {weatherInfo.daypower}
                    </div>

                </section>
            </div>
        )
    }
}

export default MainWeatherInfo