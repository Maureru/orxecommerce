import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AdminMenu } from '../../data/products'
import Button from './Button'
import Icon from './Icon'

function SideMenuAdmin({active = "Home", role = "admin"}) {

  const anim = {
    hide: {
      x: -200,
      transition: {
        ease: 'linear',
        duration: 0.4
      }
    },
    show: {
      x: 0,
      transition: {
        ease: 'linear',
        duration: 0.4
      }
    },
  }

  const control = useAnimation()

  const open = () => {
    control.start("show")
  }
  const close = () => {
    control.start("hide")
  }

  const refMenu = useRef(null)


  useEffect(() => {
    
    const current = refMenu.current

    addEventListener("mousedown", (e) => {
      if (!current.contains(e.target)) {
        close()
      }
    })



    return () => removeEventListener("mousedown", (e) => {
      
      if (!current.contains(e.target)) {
        close()
      }
    })
  }, [])
  

  return (
    <div>
      <div onClick={open} className='fixed z-[20] top-2 right-2 p-2 lg:hidden bg-[#F4ECE3] cursor-pointer'>
        <GiHamburgerMenu/>
      </div>
      <div style={{boxShadow: '9px 3px 15px -3px rgba(0,0,0,0.1)'}} className='fixed bg-[#F4ECE3] hidden lg:block lg:sticky top-0 left-0 w-[200px] px-2 py-4 h-screen'>
        <p className='font-thin text-lg'>ORX Clothing<span style={{fontVariant: 'small-caps'}} className='text-[11px]'>admin</span></p>
        <ul className='mt-4 flex gap-4 flex-col'>
            {
                AdminMenu.map((menu, i) => (
                <Link key={i} href={menu.link}><li  className={`flex gap-2 hover:bg-[#D3BDA0] ${menu.name === active ? 'bg-[#D3BDA0]': null} rounded-md items-center p-2`}><Icon as={menu.icon}/> {menu.name}</li></Link>
                ))
            }
        
            
        </ul>
        <Button className='flex bg-[#D3BDA0] gap-2 items-center absolute bottom-4 px-12 py-2'><BiLogOutCircle/> Logout</Button>
      </div>
      <motion.div ref={refMenu} variants={anim} initial="hide" animate={control} style={{boxShadow: '9px 3px 15px -3px rgba(0,0,0,0.1)'}} className='fixed z-50 bg-[#F4ECE3] lg:hidden top-0 left-0 w-[200px] px-2 py-4 h-screen'>
        <p className='font-thin text-lg'>ORX Clothing<span style={{fontVariant: 'small-caps'}} className='text-[11px]'>admin</span></p>
        <ul className='mt-4 flex gap-4 flex-col'>
            {
                AdminMenu.map((menu, i) => (
                <Link key={i} href={menu.link}><li  className={`flex gap-2 hover:bg-[#D3BDA0] ${menu.name === active ? 'bg-[#D3BDA0]': null} rounded-md items-center p-2`}><Icon as={menu.icon}/> {menu.name}</li></Link>
                ))
            }
        
            
        </ul>
        <Button className='flex bg-[#D3BDA0] gap-2 items-center absolute bottom-4 px-12 py-2'><BiLogOutCircle/> Logout</Button>
      </motion.div>
    </div>
  )
}

export default SideMenuAdmin