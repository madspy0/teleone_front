import React from 'react'
//import {navigate} from 'gatsby'
import FormLogin from './FormLogin'
//import View from './View'
import {handleLogin, isLoggedIn} from '../utils/auth'

class Login extends React.Component {
    state = {
        username: ``,
        password: ``,
    }

    handleUpdate(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        handleLogin(this.state)
    }

    render() {
        if (isLoggedIn()) {
            //
            return false
        }

        return (

            <FormLogin
                handleUpdate={e => this.handleUpdate(e)}
                handleSubmit={e => this.handleSubmit(e)}
            />

        )
    }
}

export default Login