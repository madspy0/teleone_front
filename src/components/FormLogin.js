import React from 'react'

const FormLogin =  ({ handleSubmit, handleUpdate }) => (
    <form
        method='post'
        onSubmit={ event => {
             handleSubmit(event)
        }}
    >
        <p>
            For this demo, please log in with the username <code>gatsby</code> and the
            password <code>demo</code>.
        </p>
        <label >
            Username
            <input
                type='text'
                name='username'
                onChange={handleUpdate}
            />
        </label>
        <label >
            Password
            <input
                type='password'
                name='password'
                onChange={handleUpdate}
            />
        </label>
        <input  type='submit' value='Log In' />
    </form>
)
export default FormLogin