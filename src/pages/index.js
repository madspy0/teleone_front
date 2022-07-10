import * as React from "react"
import Login from "../components/Login"
import Status from "../components/Status"
import Message from "../components/Message"
import {Subscribe} from "../components/Subscribe"

export default function Home() {

    return (
        <>
            <Status />
            <Login />
            <div>Hello world!</div>
            <Message/>
            <Subscribe/>
    </>
    )
}
