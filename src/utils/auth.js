//import MeToken from "./MeToken";
import fetch from 'cross-fetch';
import {navigate} from "gatsby";

const isBrowser = typeof window !== `undefined`

const getUser = () =>
    window.localStorage.gatsbyUser
        ? JSON.parse(window.localStorage.gatsbyUser)
        : {}

const setUser = user => (window.localStorage.gatsbyUser = JSON.stringify(user))

const getJwt = async ({username, password}) => {
    const url = 'http://localhost:9000/api/login';

    try {
        document.body.style.cursor = "wait";
        const response = await fetch(url, {
            method: 'POST', // или 'PUT'
            body: JSON.stringify({'username': username, 'password': password}), // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) { await Promise.reject(response); }
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        document.body.style.cursor = "auto";
        return (JSON.stringify(json))
    } catch (error) {
        console.error('Ошибка:', error);
        document.body.style.cursor = "auto";
    }
}

export const handleLogin =  async ({username, password}) => {
    if (!isBrowser) return false

    const jwt =  await getJwt({username, password})

    if(jwt) {
        setUser({
            name: username,
            legalName: `James K. User`,
            email: username,
            //token: MeToken(username)
            token: JSON.parse(jwt)['apiToken']
        })
        await navigate('/')
    }
}

/*    return false
}*/

export const isLoggedIn = () => {
    if (!isBrowser) return false

    const user = getUser()

    return !!user.email
}

export const getCurrentUser = () => isBrowser && getUser()

export const logout = callback => {
    if (!isBrowser) return

    console.log(`Ensuring the \`gatsbyUser\` property exists.`)
    setUser({})
    callback()
}