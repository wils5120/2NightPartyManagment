import React, { useState } from 'react';

export default (initial, onSubmit) => {

    const [ inputs, setInputs ] = useState(initial)

    const subscribe =  field => value => {
        setInputs({...inputs, [field]:value})
    }

    const handleSubmit = () => {
        onSubmit(inputs)
    }

    return { subscribe, handleSubmit, inputs }

}