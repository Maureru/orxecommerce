import React from 'react'
import Image from 'next/image'
import { MdModeEdit } from 'react-icons/md'
import { motion } from 'framer-motion'

function CardProduct({product, setIsEdit, setEditProduct, openAdd = () => {}}) {

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
    <motion.div variants={anim} initial="initial" animate="animate" exit="exit" layout className='relative group w-24 h-24 lg:h-44 lg:w-44 rounded-lg overflow-hidden'>
        <div className='relative p-4 w-[100%] flex justify-center items-center h-[100%] bg-black/40 z-20'>
            <div onClick={() => {
                setEditProduct(product)
                setIsEdit(true)
                openAdd()
            }} className='absolute right-2 top-2 cursor-pointer p-2 bg-[#F4ECE3] rounded-full'><MdModeEdit/></div>
            <p className='text-center text-[11px] lg:text-sm text-white'>{product.name}</p>
            <p className='absolute bottom-1 right-1 text-[11px] py-1 px-2 bg-[#F4ECE3] rounded-lg'>{product.numSold === 0 ? null : <>{product.numSold} Sold</>}</p>
        </div>
        <Image src={product.image} className='group-hover:scale-125 transition-all duration-100' alt='pr' layout="fill" objectFit="cover" />
    </motion.div>
  )
}

export default CardProduct