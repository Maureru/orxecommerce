import Image from 'next/image';
import React, { useContext, useEffect, useRef } from 'react'
import { BsFillCartFill } from 'react-icons/bs';
import { BsFillHandbagFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { TbMoodEmpty } from 'react-icons/tb';
import Button from '../Misc/Button';
import girl from '../../public/assets/bag.png'
import { Store } from '../../store/Store';

function Cart({setIsCartOpen}: {setIsCartOpen: () => void}) {

    const cartRef = useRef(null)

    const {state, dispatch} = useContext(Store);
    const {cart: {cartItems}} = state;


    let sum = 0;

    cartItems.map((item, i) => {
        const cost = item.price * item.quantity
        sum = sum + cost;
    })

    

    useEffect(() => {
        const clickOutside = (e) => {
            if (!cartRef.current.contains(e.target)) {
                setIsCartOpen()
            }
        }
        addEventListener("mousedown", clickOutside)

        return () => removeEventListener("mousedown", clickOutside)
    },[setIsCartOpen])


    console.log(cartItems);
    
  return (
    <div ref={cartRef} style={{boxShadow: '11px 0px 15px -3px rgba(0,0,0,0.1)'}} className='fixed flex flex-col top-0 left-0 z-50 w-screen md:w-[500px] h-screen bg-[#F4ECE3]'>
        <div onClick={setIsCartOpen} className='absolute right-2 top-2 text-[#D3BDA0] text-2xl cursor-pointer'><BsArrowLeftCircleFill/></div>
        <p className='text-2xl mt-4 px-4 font-bold flex items-center gap-3'>Cart <BsFillCartFill className='text-[#D3BDA0]'/></p>
        <div className='px-8 w-[100%] mt-3 flex flex-col gap-4 grow overflow-y-scroll py-6'>
            {/* ====Cart Items */}

            {
                cartItems.map((item, i) => {
                    
                    
                    return (
                        <div key={i} style={{boxShadow: '0px 0px 15px 8px rgba(0,0,0,0.1)'}} className='relative w-[100%] h-[160px] flex rounded-md'>
                            <div onClick={() => dispatch({type: 'REMOVE_CART', payload: {_id: item._id, size: item.size, color: item.color}})} className='absolute right-[-0.5rem] top-[-0.5rem] cursor-pointer p-2 bg-white rounded-full'><BsFillTrashFill/></div>
                            <div className=' w-[50%] relative overflow-hidden h-[160px] rounded-tl-md rounded-bl-md'>
                                <Image src={item.image} layout="fill" objectFit='cover' alt="cartItem"/>
                            </div>
                            <div className='w-[50%] flex flex-col justify-around p-2'>
                                <p className='font-semibold text-[13px]'>{item.name}</p>
                                <div className='flex items-center gap-2'>
                                    <p>${item.price}</p>
                                    <p className='text-[10px] text-zinc-800'>x{item.quantity}</p>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='text-[10px] uppercase p-1 w-8 rounded-sm outline-dashed outline-2 flex items-center justify-center text-black'>{item.size}</div>
                                    <div style={{backgroundColor: item.color}} className={`h-8 w-8 bg-[${item.color}] rounded-full`}/>
                                </div>
                                <div className='flex gap-3'>
                                    <p onClick={() => dispatch({type: 'DECREASE_ITEM_QUANTITY', payload: {_id: item._id}})} className='grow-[1.5] cursor-pointer flex justify-center rounded-md bg-white'>-</p>
                                    <p className='grow flex justify-center'>{item.quantity}</p>
                                    <p onClick={() => dispatch({type: 'INCREASE_ITEM_QUANTITY', payload: {_id: item._id}})} className='grow-[1.5] cursor-pointer flex justify-center rounded-md bg-[#D3BDA0] text-white'>+</p>
                                </div>
                            </div>
                        </div>
                        )
                })
            }

            {cartItems.length === 0 ? <div className='h-[100%] w-[100%] flex flex-col justify-center items-center'>
                <TbMoodEmpty className='text-4xl'/>
                <p>Cart Empty</p>
            </div> : null}


            {/* <div style={{boxShadow: '0px 0px 15px 8px rgba(0,0,0,0.1)'}} className='relative w-[100%] h-[150px] flex rounded-md'>
                <div className='absolute right-[-0.5rem] top-[-0.5rem] cursor-pointer p-2 bg-white rounded-full'><BsFillTrashFill/></div>
                <div className=' w-[50%] relative overflow-hidden h-[100%] rounded-tl-md rounded-bl-md'>
                    <Image src={girl} layout="fill" objectFit='cover' alt="cartItem"/>
                </div>
                <div className='w-[50%] flex flex-col justify-around p-2'>
                    <p className='font-semibold text-[13px]'>DW dwakdnaw dwakdjwakd dwadwadawdawd</p>
                    <p>$100.00</p>
                    <p className='text-[10px] p-1 w-8 rounded-lg bg-black flex justify-center text-white'>sm</p>
                    <div className='flex gap-3'>
                        <p className='grow-[1.5] cursor-pointer flex justify-center rounded-md bg-white'>-</p>
                        <p className='grow flex justify-center'>2</p>
                        <p className='grow-[1.5] cursor-pointer flex justify-center rounded-md bg-[#D3BDA0] text-white'>+</p>
                    </div>
                </div>
            </div> */}
        </div>
        {
            cartItems.length === 0 ? null : <div className='flex flex-col px-8 py-2'>
            <Button className='bg-white py-2 flex items-center justify-center gap-3 font-semibold'>Checkout <BsFillHandbagFill className='text-[#D3BDA0]'/><p>Total: ${sum}</p></Button>
        </div>
        }
    </div>
  )
}

export default Cart