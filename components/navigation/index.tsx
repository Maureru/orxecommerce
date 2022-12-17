import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoMdCart } from 'react-icons/io';
import { BsArrowBarRight, BsFillSuitHeartFill, BsHandbagFill, BsShopWindow } from 'react-icons/bs';
import { GiHamburgerMenu, GiLoincloth } from 'react-icons/gi';
import axios from 'axios'
import { BiCategoryAlt, BiLogOutCircle } from 'react-icons/bi';
import SearchBar from './SearchBar';
import Cart from '../cart/Cart';
import { motion, useAnimation } from 'framer-motion';
import { cartAnimation, menuMobileAnimation } from '../../config/animation';
import Link from 'next/link';
import Button from '../Misc/Button';
import { Store } from '../../store/Store';
import { AiFillHome, AiOutlineClose } from 'react-icons/ai';
import { FaHatCowboy } from 'react-icons/fa';
import Icon from '../Misc/Icon';
import { useRouter } from 'next/router';

function Navigation({search = '' ,setSearch = (e) => {}}) {

    const control = useAnimation()
    const menuControl = useAnimation()
    const [mounted, setMounted] = useState(false)

    const menuRef = useRef(null)
    const router = useRouter()
    const {state, dispatch} = useContext(Store)

    const {cart: {cartItems}} = state

    const handleCloseCart = () => {
        control.start("hide")
    }
    const handleCloseMenu = () => {
        menuControl.start("hide")
    }
    const handleCloseMenuOut = (e) => {
        if (!menuRef.current.contains(e.target)) {
            menuControl.start("hide")
        }
    }

    const [isProfOpen, setIsProfOpen] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleOpenCart = () => {
        control.start("show")
    }
    const handleOpenMenu = () => {
        menuControl.start("show")
    }

    useEffect(() => {
        addEventListener("mousedown", handleCloseMenuOut)

        return () => removeEventListener("mousedown", handleCloseMenuOut)
    }, [])
    

    if (!mounted) {
        return <></>
    }

    const menu = [
        {
            name: 'Home',
            href: '/',
            icon: AiFillHome
        },
        {
            name: 'Men',
            href: '/',
            icon: FaHatCowboy
        },
        {
            name: 'Women',
            href: '/',
            icon: GiLoincloth
        },
        {
            name: 'Shop',
            href: '/shop',
            icon: BsShopWindow
        },
    ]


    
    
    

  return (
    <div id='navigation' className='fixed top-[0] z-40 w-screen bg-[#F4ECE3] h-20 flex justify-between items-center px-4 sm:px-8 lg:px-20'>
        <div className='flex gap-4 sm:gap-12 items-center'>
            <motion.div className='fixed bg-[#F4ECE3] z-50 top-0 left-0' variants={cartAnimation} initial="hide" animate={control}>
                <Cart  setIsCartOpen={handleCloseCart}/>
            </motion.div>


            <motion.div ref={menuRef} variants={menuMobileAnimation} initial="hide" animate={menuControl} style={{boxShadow: '-11px 0px 11px -3px rgba(0,0,0,0.1)'}} className='py-10 px-4 fixed h-screen w-[250px] z-[99] bg-[#F4ECE3] right-0 top-0'>
                <p className='font-bold text-lg'>MENU</p>
                <BsArrowBarRight onClick={handleCloseMenu} className='absolute top-2 left-2 text-lg cursor-pointer'/>
                <ul className='mt-4'>
                    {
                        menu.map((men, i) => (
                            <Link key={i} href={men.href}>
                                <li className='flex gap-3 items-center p-3 rounded-md hover:bg-[#D3BDA0]'><Icon as={men.icon}/> {men.name}</li>
                            </Link>
                        ))
                    }
                
                </ul>
            </motion.div>



            <div id='logo'><Link href="/"><p className='text-xl font-semibold'>ORX</p></Link></div>
            <div>
                <ul className='flex items-center gap-8'>
                    <li className='flex p-2 rounded-lg bg-[#D3BDA0] gap-6 items-center'>
                        <div className='relative'>
                            <IoMdCart className='cursor-pointer' onClick={handleOpenCart}/>
                            {
                                cartItems.length !== 0 ? <p className='absolute right-[-10px] top-[-15px] w-5 h-5 flex justify-center items-center rounded-full text-[12px] font-semibold bg-red-400'>
                                {cartItems.length}
                            </p>: null
                            }
                        </div>
                        <BsFillSuitHeartFill className='text-white'/>
                    </li>
                    <li className='hidden md:block'><p>Women</p></li>
                    <li className='hidden md:block'><p>Men</p></li>
                    <li className='hidden md:block'><Link href="/shop"><p>Shop</p></Link></li>
                </ul>
            </div>
        </div>
         <div className='flex items-center gap-4'>
            <SearchBar search={search} setSearch={setSearch}/>
            {/* <BiCategoryAlt className='text-[1.5rem]'/> */}
            {
                state.user ? 
                <div onClick={() => {
                    setIsProfOpen(!isProfOpen)
                }} className='w-8 h-8 bg-[#D3BDA0] relative rounded-full flex items-center justify-center'>
                    {
                        isProfOpen ? <div className='bg-white   rounded-md p-2 absolute right-0 bottom-[-300%] flex gap-4 flex-col items-center'>
                        <p className='cursor-pointer flex gap-2 items-center'><BsHandbagFill/> Orders</p>
                        <Button onClick={() => {
                            dispatch({type: 'LOGOUT'})
                            router.push('/')
                        }} className='flex gap-2 bg-[#D3BDA0] items-center py-1 px-2'><BiLogOutCircle/> Logout</Button>
                    </div> : null
                    }
                    {
                        isProfOpen ? <p className='w-8 h-8 text-center text-xl font-bold flex items-center justify-center cursor-pointer '><AiOutlineClose/></p> :
                        <p className='w-8 h-8 text-center text-xl font-bold cursor-pointer '>{state.user.name.slice(0,1)}</p>
                    }
                </div>
                :
                <Link href="/login"><Button className='bg-[#D6BFA2] p-1 text-sm  md:block'>LOGIN</Button></Link>
            }
            <GiHamburgerMenu onClick={handleOpenMenu} className='cursor-pointer text-xl block md:hidden'/>
         </div>
    </div>
  )
}

export default Navigation