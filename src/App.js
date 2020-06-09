import React from 'react'

import WeatherPage from './pages/weather-page'

class App extends React.Component {
  render() {
    return(
      <div>
        <h1>Hello World</h1>
        <WeatherPage />
      </div>
    )
  }
}

export default App