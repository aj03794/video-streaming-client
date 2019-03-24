import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app.js'

export const startReactUi = () => {
    ReactDOM.render(<App />, document.getElementById("root"))
    return Promise.resolve()
}
