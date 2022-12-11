import React from 'react'

function Button({children, className='', onClick = () => {}, submit = false}) {
  return (
    <button type={submit ? 'submit' : 'button'} className={`cursor-pointer rounded-md hover:ring-2 dark:hover:ring-gray-300 hover:ring-gray-800 ${className}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button