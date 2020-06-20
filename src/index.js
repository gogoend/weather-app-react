import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import { HashRouter as Router, Route} from 'react-router-dom'

((doc) => {
    function recalc() {
        let remBase = 100
        if (doc.documentElement.clientWidth > 375) {
            doc.documentElement.style.fontSize = `${remBase}px`
        } else {
            doc.documentElement.style.fontSize = remBase * ((doc.documentElement.clientWidth) / 375) + 'px'
        }
    }
    var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvent, recalc, false);
    window.addEventListener('DOMContentLoaded', recalc, false);
})(document)
ReactDOM.render(
    <Router>
        <Route path="/" component={App}></Route>
        {/* <App/> */}
    </Router>
, document.getElementById('root'))
