import axios from 'axios'
import moment from 'moment'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

function OrderRow({order}) {

    const [isShip, setIsShip] = useState(order.isShipped)
    const [isOpen, setIsOpen] = useState(false)
    const moreRef = useRef<HTMLDivElement>()
    const [isDelivered, setIsDelivered] = useState(order.isDelivered)
    
  return (
    <tr>
        <div onClick={() => {
            setIsOpen(!isOpen)
        }} className='flex mt-2 justify-between px-2 items-center cursor-pointer'>
            <td className='font-bold'>{order.shippingAddress.fullName}</td>
            <div className='flex gap-8'>
                <td><p className='py-1 px-2 text-[12px] bg-slate-200 rounded-md text-green-600'>{order.user ? 'REGISTERED' : 'GUEST'}</p></td>
                <td className='hidden md:block font-thin'>{order.shippingAddress.email}</td>
                <td><p className='py-1 px-2 text-[12px] bg-slate-300 rounded-md text-green-600'>{!isShip ? 'Pending' : !isDelivered ? 'Shipped' : 'Delivered'}</p></td>
                <td className='text-[11px]'>{moment(order.createdAt).fromNow()}</td>
            </div>
        </div>
        <div ref={moreRef} style={
            isOpen ? {
                height: moreRef.current.scrollHeight + "px",
                transition: 'height ease 0.3s'
            } : {
                height: '0px',
                transition: 'height ease 0.3s'
            }
        } className='bg-white overflow-hidden mt-2'>
            <div className='grid p-2 md:p-4 grid-cols-1 gap-2 md:grid-cols-2 rounded-sm '>
            <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                {
                    order.orderItems.map((item, i) => (
                        <div key={i} className='flex gap-2'>
                    <div className='w-[60px] h-[60px] relative'>
                        <Image className='rounded-sm' src={item.image} fill objectFit='cover' alt=""/>
                    </div>
                    <div>
                        <p className='text-[12px]'>{item.name.slice(0, 35)}</p>
                        <div className='flex mt-1 gap-2 items-center'>
                            <p className='font-bold'>${item.price} <span className='text-[11px]'>x{item.quantity}</span></p>
                            <div style={{
                                backgroundColor: `${item.color}`
                            }} className='w-6 h-6 rounded-full'/>
                            <p className='text-[12px] py-1 px-2 outline-dashed uppercase'>{item.size}</p>
                        </div>
                    </div>
                </div>
                    ))
                }
                
                
                
                
                <div className=''>
                    <p className='font-bold'>Total: <span className='font-normal'>${order.totalPrice}</span></p>
                </div>
            </div>
            <div>
                <p className='text-center font-bold text-xl mb-2'>Shipping Details</p>
                <p className='text-sm'><span className='font-semibold'>Name:</span> {order.shippingAddress.fullName}</p>
                <p className='text-sm mt-2'><span className='font-semibold'>Email:</span> {order.shippingAddress.email}</p>
                <p className='text-sm mt-2'><span className='font-semibold'>Phone:</span> {order.shippingAddress.phone}</p>
                <p className='text-sm mt-2'><span className='font-semibold'>Street Address 1:</span> {order.shippingAddress.streetAddress}</p>
                <p className='text-sm mt-2'><span className='font-semibold'>Street Address 2:</span> {order.shippingAddress.streetAddress2}</p>
                <p className='text-sm mt-2'><span className='font-semibold'>City:</span> {order.shippingAddress.city}</p>
                <p className='text-sm mt-2'><span className='font-semibold'>State:</span> {order.shippingAddress.state}</p>
                <p className='text-sm mt-2'><span className='font-semibold'>Postal Code:</span> {order.shippingAddress.postalCode}</p>
                <p className='text-sm mt-2'><span className='font-semibold'>Country:</span> {order.shippingAddress.country}</p>
                <div className='mt-4'>
                    <p className='font-bold '>Ship</p>
                    <div onClick={async() => {
                        
                        if (!isShip) {
                            await axios.post('/api/order/ship', {id: order._id}).then((res) => {
                                console.log(res.data.message);
                                setIsShip(true)
                            })
                        }
                    }} className='w-[40px] cursor-pointer relative h-[25px] flex items-center rounded-xl bg-slate-200'>
                        <div className={`h-[22px] w-[22px] rounded-full absolute ${isShip ? 'right-0 bg-blue-400' : 'bg-gray-700'}`}/>
                    </div>
                </div>
                <div className='mt-4'>
                    <p className='font-bold '>Delivered</p>
                    <div onClick={async() => {
                        
                        if (isShip) {
                            if (!isDelivered) {
                                await axios.post('/api/order/delivered', {id: order._id}).then((res) => {
                                    console.log(res.data.message);
                                    setIsDelivered(true)
                                })
                            }
                        }
                    }} className='w-[40px] cursor-pointer relative h-[25px] flex items-center rounded-xl bg-slate-200'>
                        <div className={`h-[22px] w-[22px] absolute ${isDelivered ? 'right-0 bg-blue-400' : 'bg-gray-700'} rounded-full `}/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </tr>
  )
}

export default OrderRow