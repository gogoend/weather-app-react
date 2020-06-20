import React from 'react'
import { Route, Link } from 'react-router-dom'

import WeatherPage from './pages/weather-page'
import Covid19Page from './pages/covid-19-page'
import './style/reset.css'
import style from './style/App.module.css'

const { Provider, Consumer } = React.createContext()
const cityList = [
  {
    city: '北京',
    province: '北京',
    code: 110000
  },
  {
    city: '上海',
    province: '上海',
    code: 310000
  },
  {
    city: '成都',
    province: '四川',
    code: 510100
  },
  {
    city: '三沙',
    province: '海南',
    code: 460300
  },
  {
    city: '深圳',
    province: '广东',
    code: 440300
  },
  {
    city: '厦门',
    province: '福建',
    code: 350200
  },
  {
    city: '广州',
    province: '广东',
    code: 440100
  },
  {
    city: '重庆',
    province: '重庆',
    code: 500000
  },
  {
    city: '杭州',
    province: '浙江',
    code: 330100
  },
  {
    city: '拉萨',
    province: '西藏',
    code: 540100
  }
]

function getInfoById(dict, id, field) {
  let result = dict.filter(item => {
    return item[field] === id
  })

  return result
}

class App extends React.Component {
  constructor(prop) {
    super()
    this.state = {
      globalCurrentCity: getInfoById(cityList, 110000, 'code')[0]
    }
  }
  globalCityChange(e) {
    let cityCode = Number(e.target.value)
    this.setState({
      globalCurrentCity: getInfoById(cityList, cityCode, 'code')[0]
    }, () => {
      this.props.history.push(`/home/${this.state.globalCurrentCity.code}`)
    })
  }
  render() {

    let cityOptionDOM = cityList.map((item, index) => (<option key={index} value={item.code}>{item.city}</option>))

    return (
      <Provider value={{
        globalCurrentCity: this.state.globalCurrentCity
      }}>
        <div className={style['app-wrap']}>
          <nav>
            <h1>{this.state.globalCurrentCity.city}</h1>
            <section className={style['city-select']}>
              <select onChange={(e) => this.globalCityChange(e)} value={this.state.globalCurrentCity.code}>
                {cityOptionDOM}
              </select>
            </section>
          </nav>
          {/* <Route path="/" exact component={WeatherPage} /> */}
          <Route path="/home/:cityId" component={WeatherPage}></Route>
          <Route path="/covid-19/:cityId" component={Covid19Page}></Route>
          {/* <WeatherPage city={this.state.globalCurrentCity} /> */}
          <nav>
            <Link
              to={`/home/${this.state.globalCurrentCity.code}`}
            >天气</Link>
            <Link to={`/covid-19/${this.state.globalCurrentCity.city}`}>COVID-19</Link>
          </nav>
        </div>
      </Provider>
    )
  }
}

export {
  Consumer
}
export default App