import React from 'react'
import Image from 'next/image'

function ImagePreview({product}) {
    
    
  return (
    <div className=''>
        <div className='relative h-[400px] sm:h-[600px] xl:h-[calc(100vh-200px)] w-[100%] rounded-md overflow-hidden'>
            {product.image ? <Image src={product.image} objectFit="cover" layout='fill' alt='img'/>: null}
            {product.originalPrice ? 
            <div className='flex flex-col items-center absolute top-0 bg-white w-10 rounded-br-lg rounded-bl-lg right-2 z-20'>
                <p className='text-sm'>{100 - (product.price / product.originalPrice)*100}%</p>
                <p className='text-sm'>OFF</p>
                </div> : null
            }
        </div>
        <div className='flex gap-2 items-center h-[120px]'>
            <div className='h-[60px] w-[60px] sm:h-[100px] relative sm:w-[100px] rounded-md overflow-hidden'>
                {product.image ? <Image src={product.image} objectFit="cover" layout='fill' alt='img'/>: null}
            </div>
            <div className='grow flex items-center gap-2 overflow-x-scroll'>
                
            {
                    product.moreImage.map((prod, i) => (
                        <div key={i} className='h-[60px] w-[60px] sm:h-[100px] relative sm:w-[100px] rounded-md overflow-hidden'>
                            {prod ? <Image src={prod} objectFit="cover" layout='fill' alt='img'/>: null}
                        </div>
                    ))
                }
                 
            </div>
        </div>
    </div>
  )
}

export default ImagePreview