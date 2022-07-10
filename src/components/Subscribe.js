import {getCurrentUser, isLoggedIn} from "../utils/auth";
import {EventSourcePolyfill} from 'event-source-polyfill';
import React, {useState} from "react";
import Base64url from 'crypto-js/enc-base64url';
import Utf8 from 'crypto-js/enc-utf8'

let eventSource;
export const Subscribe = () => {
    const [isActive, setIsActive] = useState(false)
    const [data, updateData] = useState([])
    if (!isLoggedIn()) {
        return false
    }
    const {name, token} = getCurrentUser()
    const eventSourceInitDict = {
        headers: {
            Authorization: 'Bearer ' + token,
            //heartbeatTimeout: 180*1000
        },
        lastEventIdQueryParameterName: 'Last-Event-Id',
        //   withCredentials: true
    }
    eventSource && eventSource.close()

    if (isActive === true) {
        const u = new URL('https://localhost/.well-known/mercure')
        u.searchParams.append("topic", "https://demo/" + name.split('@')[0])
        eventSource = new EventSourcePolyfill(u,
            eventSourceInitDict
        )

        eventSource.addEventListener("message", e => {
            if (e.lastEventId === '-1') {
                // закрываем соединение
                this.close()
            }
            let out = e.target.headers.Authorization.split('.')
            let sender = JSON.parse(Utf8.stringify(Base64url.parse(out[1])).toString())
            console.log(sender.mercure.payload.user)
            updateData(data => [...data, {
                data: e.data,
                sender: sender.mercure.payload.user,
                time: new Date().getTime()
            }])
        })
        eventSource.onerror = (e) => {
            console.log(e)
      //      if(e.status === 401) { logout(navigate('/')) }
        }
    }
    // The @titelmedia/node-fetch is used instead of node-fetch as it supports ReadableStream Web API
    /*    import('node-fetch').then(function (fetch) {
            import('event-source-polyfill').then(function (x) {
                const es = new x.EventSourcePolyfill(u,{ eventSourceInitDict });
                es.onerror = es.onopen = es.onmessage = function (event) {
                    console.log(event.type + ': ' + event.data);
                };
            })
        });*/
    //


        return (
            <>
                <button onClick={() => setIsActive(!isActive)}>{isActive ? 'active' : 'not active'}</button>
                {
                    data.map((item, i) =>
                        <li key={i}><b>{item.sender}</b>
                            <small>{item.time}</small>
                            {item.data}</li>
                    )
                }
            </>
        )
}