import React from 'react'
import { Link, navigate } from 'gatsby'
import { getCurrentUser, isLoggedIn, logout } from '../utils/auth'


const Status= () => {
    let details
    if (!isLoggedIn()) {
        details = (
            <p>
                To get the full app experience, you’ll need to
                {` `}
                <Link to='/login'>log in</Link>.
            </p>
        )
    } else {
        const { name, email, token } = getCurrentUser()

        details = (
            <>
            <p>
                Logged in as {name} ({email}
                )!
                {` `}

                <a
                    href='/'
                    onClick={event => {
                        event.preventDefault()
                        logout(() => navigate(`/`))
                    }}
                >
                    log out
                </a>

            </p>
        <h3>{token}</h3>
            </>
        )
    }

    return <div>{details}</div>
}
export default Status