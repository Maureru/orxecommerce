import React, { useState } from 'react'
import { BsFillStarFill } from 'react-icons/bs';

function RateIt({starNumber = 0, setStarNumber}) {

    /* const [starNumber, setStarNumber] = useState(0) */

    const stars = [1, 2 , 3 ,4 ,5];

  return (
    <div className='flex gap-1'>
        {stars.map((star, i) => (
            <div key={i} >
                <BsFillStarFill onMouseEnter={() => {
                    setStarNumber(star)
                }} className={`text-2xl ${starNumber >= star ? 'text-black' : 'text-white'}`}/>
            </div>
        ))}
    </div>
  )
}

export default RateIt