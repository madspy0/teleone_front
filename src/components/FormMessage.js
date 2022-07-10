import React from 'react'

const FormMessage =  ({ handleSubmit, handleUpdate, state }) => (
    <form
        method='post'
        onSubmit={event => {
            handleSubmit(event)
        //    navigate(`/`)
        }}
    >
        <p>
            Your <code>message</code>.
        </p>
        <label >
            Topic
            <input
                type='text'
                name='topic'
                onChange={handleUpdate}
                value={state.topic}
            />
        </label>
        <label >
            Data
            <input
                type='text'
                name='data'
                onChange={handleUpdate}
                value={state.data}
            />
        </label>

        <input  type='submit' value='Send' />
    </form>
)
export default FormMessage