import Image from 'next/image'
import React from 'react'
import Button from '../Misc/Button'
import girl from '../../public/assets/girl_header.png'
import avatar from '../../public/assets/avatar2.png'
import cart from '../../public/assets/cart.png'
import bag from '../../public/assets/bag.png'
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { SiShopify } from 'react-icons/si';
import { ImAmazon } from 'react-icons/im';
import { SiEbay } from 'react-icons/si';
import { SiNike } from 'react-icons/si';
import { motion } from 'framer-motion'
import { shoppingGirl, stagger, toLeft, toRight } from '../../config/animation'

function Header() {


  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className=' lg:px-0 xl:px-8 2xl:px-20 h-auto lg:h-[calc(100vh-5rem)] overflow-hidden flex flex-col gap-4 lg:grid grid-cols-2 gap-x-2 relative'>
      <motion.div variants={toRight} initial="initial" animate="animate" className='flex flex-col justify-center'>
        <div className='mt-4'>
          <h1 className='text-6xl text-philosopher font-bold'>Let&apos;s go<br/> get the best<br/>  discounts</h1>
          <div className='flex gap-4 mt-4'>
            <Button className='bg-[#594A98] px-8 text-white'>Learn more</Button>
            <div className='flex gap-2 items-center'>
              <div className='border-[#E9B527] rounded-full border-[0.5rem]'>
                <BsFillPlayCircleFill className='text-[1.5rem] '/>
              </div>
              How it works
            </div>
          </div>
        </div>
      </motion.div>
      {/* ===========================> */}
      <motion.div variants={toLeft} initial="initial" animate="animate" className='flex justify-end items-center'>
        <div className='w-[250px]'>
          <div className='w-[50px] h-[50px] bg-[#E9B527] rounded-full'><Image src={avatar} width={50} height={50} alt='avatr'/></div>
          <p className='mt-2 font-semibold text-gray-600'>On elegance suits. offers valid upto dec 25.</p>
          {/* ========== cards */}
          <div className='mt-6 w-[100%] grid grid-cols-2 h-[100px] bg-[#594A98] rounded-xl overflow-hidden'>
            <div className='pl-4 pt-2'>
              <p className='text-white font-semibold'>Trending Offers</p>
            </div>
            <div>
              <Image src={cart} objectFit="cover" alt="cart"/>
            </div>
          </div>
          <div className='w-[100%] relative overflow-hidden z-10 grid grid-cols-2 h-[100px] bg-[#8884FE] mt-[-2rem] rounded-xl'>
            <div className='pl-4 flex items-center'>
              <p className='text-white font-semibold'>Best to Day</p>
            </div>
            <div className='relative'>
              <Image src={cart} objectFit="cover" alt="cart"/>
            </div>
          </div>
        </div>
      </motion.div>
      {/* ===========================> */}
      <motion.div variants={toRight} initial="initial" animate="animate">
        <div className='flex flex-col gap-4'>
          <div className='w-[250px] grid grid-cols-2 gap-2 items-end'>
            <Image className='rounded-xl' src={bag} alt="bag"/>
            <p className='font-semibold'>Choose your favourite stores</p>
          </div>
          <div className='flex justify-between w-[250px]'>
            <div className='h-10 w-10 flex justify-center items-center rounded-full bg-[#E8DDCC] text-[#80AD40] text-2xl'><SiShopify/></div>
            <div className='h-10 w-10 flex justify-center items-center rounded-full bg-[#E8DDCC] text-gray-600 text-2xl'><ImAmazon/></div>
            <div className='h-10 w-10 flex justify-center items-center rounded-full bg-[#E8DDCC] text-blue-800 text-2xl'><SiEbay/></div>
            <div className='h-10 w-10 flex justify-center items-center rounded-full bg-[#E8DDCC] text-gray-800 text-2xl'><SiNike/></div>
          </div>
        </div>
      </motion.div>
      {/* ===========================> */}
      <motion.div variants={toLeft} initial="initial" animate="animate" className='flex justify-end items-center gap-3'>
        <div className='h-16 w-16 flex justify-center items-center rounded-full bg-[#D6BFA2] text-gray-600 text-4xl'><ImAmazon/></div>
        <p className='font-bold text-philosopher'>25% offer<br/>today</p>
      </motion.div>
      <motion.div style={{translateX: '-50%'}} className='absolute z-[99] bottom-[0] left-[50%] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] 2xl:w-[600px] 2xl:h-[600px]' variants={shoppingGirl} initial="initial" animate="animate">
        <Image src={girl} alt="header" layout='fill'/>
      </motion.div>
    </motion.div>
  )
}

export default Header