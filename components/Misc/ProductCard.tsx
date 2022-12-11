import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

function ProductCard({product}) {

    const anim = {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    }


  return (
    <motion.div variants={anim} initial="initial" animate="animate" exit="exit" layout style={{boxShadow: '4px 10px 15px -3px rgba(0,0,0,0.1)'}} className='relative cursor-pointer group/image w-[250px] overflow-hidden m-h-[270px] rounded-sm'>
                <div className='relative h-[200px] w-[100%] overflow-hidden'>
                    <Image className='group-hover/image:scale-110 hover:ease-in ease-out duration-100' layout='fill' objectFit='cover' src={product.image} alt='product'/>
                </div>
                <div className='p-2'>
                    <p className='font-semibold'>{product.name}</p>
                    <p>{product.originalPrice !== 0 ? <span className='line-through text-gray-600'>${product.originalPrice}</span> : null} ${product.price}</p>
                    {product.numSold !== 0 ? <p className='absolute bottom-1 right-2 text-[12px]'>{product.numSold} Sold</p> : null}
                </div>
                {product.originalPrice ? <div className='flex flex-col items-center absolute top-0 bg-white w-10 rounded-br-lg rounded-bl-lg right-2 z-20'>
                    <p className='text-sm'>{100 - (product.price / product.originalPrice)*100}%</p>
                    <p className='text-sm'>OFF</p>
                </div> : null}
            </motion.div>
  )
}

export default ProductCard