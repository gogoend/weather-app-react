import React from 'react'
import {
    SunnyIcon
} from '../../components/weather-page/embed-svg-icon/weather-icon.js'
import style from '../../style/components/weather-page/single-weather-info.module.css'

class SingleWeatherInfo extends React.Component {
    constructor() {
        super()
        this.state = {}
        this.render()
    }
    render() {
        let chineseDigi = [
            '〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'
        ]
        if (!this.props) {
            return ''
        }
        let item = this.props['weather-info']

        return (
            <div className={style["single-info"]}>
                <h3 className={style["day"]}>
                    {new Date(item.date).getDate()}日
                </h3>
                <small className={style["week-date"]}>
                    周{item.week === '7' ? '日' : chineseDigi[item.week]}
                </small>
                <dl className={style["weather-detail"]}>
                    <dt className={style["icon"]}>
                        <SunnyIcon />
                    </dt>
                    <dd className={style["describe"]}>{item.dayweather}</dd>
                    <dd className={style["temperature"]}>{item.daytemp}℃</dd>
                </dl>
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {
        this.render()
    }
}

export default SingleWeatherInfo