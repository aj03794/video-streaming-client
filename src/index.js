import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')
const sendAuthenticationRequest = () => socket.emit('authenticate', { password: 'e8379d9d-76b4-48a5-8a93-7cc3ed1398ec' })

socket.on('connect', () => {
    console.log('Connected')
    sendAuthenticationRequest()
})

socket.on('authenticated', () => {
    console.log('Authenticated!')
})

socket.on('authentication-failed', msg => {
    console.log('authentication-failed')
})


window.onload = () => {
    initializeElements()
}

const initializeElements = () => {
    const submit = getElementById('submit-form')
    const username = getElementById('username')
    const password = getElementById('password')
    submit.onclick = event => {
        console.log('event', event)
        console.log(username.value)
        console.log(password.value)
    }
}

const getElementById = (elementId) => document.getElementById(elementId)