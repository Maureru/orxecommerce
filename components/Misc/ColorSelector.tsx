import React from 'react'
import { BsCheckLg } from "react-icons/bs";

function ColorSelector({colors = [], addCart, setAddCart}) {
    
    console.log(addCart.color);


    
  
    return (

    <div className='flex gap-2 mt-2'>
        {
            colors.map((color, i) => (
                <div style={{backgroundColor: `${color}`}} key={i} onClick={() => {setAddCart({...addCart, color: color})}}  className={`cursor-pointer h-12 w-12 overflow-hidden rounded-full`}>
                    {color === addCart?.color ? <div className='h-12 w-12 flex items-center justify-center bg-black/30'>
                        <BsCheckLg className='text-white'/>
                    </div> : null}
                </div>
            ))
        }
    </div>
  )
}

export default ColorSelector