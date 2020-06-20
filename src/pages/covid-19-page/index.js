import React from 'react'

import { get } from '../../api'

async function getCovid19Info(cityCode) {
    let data = await get('/covid-19-api?name=disease_h5')
    return data
}

// 天气组件
export default class Covid19Page extends React.Component {
    constructor(prop) {
        super()
        this.state = {
            cachedInfo: {},
            currentCityInfo:{}
        }
    }
    async componentWillMount() {
        let {data} = await getCovid19Info()
        this.setState({
            cachedInfo:JSON.parse(data)
        })
    }

    cacheInfo() {
        /* eslint-disable-next-line */
        this.state.cachedInfo={}
        this.forceUpdate();
    }

    async cityChange(e) {
        let { cachedInfo } = this.state
        let newCity = e.target ? e.target.value : e;
        let newInfo
        // 找到对应城市的信息

        this.setState({
            currentCityInfo: newInfo
        })
    }

    render() {
        let { weatherInfo } = this.state

        this.cityChange = this.cityChange.bind(this)
        return (
            <>
                <div>
                    当前城市
                </div>
            </>
        )
    }
    componentWillReceiveProps(nextProps) {
    }
}