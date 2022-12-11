import React from 'react'

function Footer() {
  return (
    <div className='p-4 mt-8 flex flex-col bg-[#D6BFA2] justify-center items-center'>
        <p>Made with love by xMau</p>
        <p>{new Date().getFullYear()} © All Rights Reserve</p>
    </div>
  )
}

export default Footer