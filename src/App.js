import React from 'react'

import WeatherPage from './pages/weather-page'

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

function getInfoById(dict,id,field){
  let result = dict.filter(item=>{
    return item[field]===id
  })

  return result
}

class App extends React.Component {
  constructor(prop) {
    super()
    this.state = {
      globalCurrentCity: getInfoById(cityList,110000,'code')[0]
    }
  }
  globalCityChange(e) {
    let cityCode = Number(e.target.value)
    this.setState({
      globalCurrentCity: getInfoById(cityList,cityCode,'code')[0]
    })
  }
  render() {

    let cityOptionDOM = cityList.map((item, index) =>  ( <option key={index} value={item.code}>{item.city}</option> ))

    return (
      <div>
        <h1>{this.state.globalCurrentCity.code}</h1>
        <section>
          <select onChange={(e)=>this.globalCityChange(e)} value={this.state.globalCurrentCity.code}>
            {cityOptionDOM}
          </select>
        </section>
        <WeatherPage city={this.state.globalCurrentCity} />
      </div>
    )
  }
}

export default App