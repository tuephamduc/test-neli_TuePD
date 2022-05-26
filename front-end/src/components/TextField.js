import React, { useRef } from 'react'

const TextField = (props) => {
  const { name, dfValue, className, required, register, ...rest } = props

  return (
    <input
      type="text"
      name={name}
      className={className}
      defaultValue={dfValue}
      required={required}
      {...register(name)}
      {...rest}
    />

  )
}

export default TextField