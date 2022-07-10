import React from 'react'
import {isLoggedIn, getCurrentUser} from '../utils/auth'
import FormMessage from "./FormMessage";
import {Publish} from "./Publish";

class Message extends React.Component {
    state = {
        topic: ``,
        data: ``,
    }

    handleUpdate(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const {token} = getCurrentUser()
        Publish(this.state)
        console.log(this.state, token)
        this.setState({
            topic: ``,
            data: ``,
        })
    }

    render() {
        if (!isLoggedIn()) {
            // navigate(`/`)
            return false
        }

        return (

            <FormMessage
                handleUpdate={e => this.handleUpdate(e)}
                handleSubmit={e => this.handleSubmit(e)}
                state={this.state}
            />

        )
    }
}

export default Message