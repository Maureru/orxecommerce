import React from 'react'
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";

function Rating({rating = 0, starSize = 'text-2xl'}) {
  return (
    <div className={`flex gap-1 ${starSize}`}>
        {
            [1,2,3,4,5].map((num, i) => (
                <div key={i}>
                    {
                        rating >= num ? <BsFillStarFill className='text-black'/> : (rating > (num - 1) && rating < num ) ? <BsStarHalf/> : <BsStar/>
                    }
                </div>
            ))
        }
    </div>
  )
}

export default Rating