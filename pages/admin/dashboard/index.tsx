
import React, { useContext, useEffect, useState } from 'react'
import AdminCard from '../../../components/Misc/AdminCard'
import SideMenuAdmin from '../../../components/Misc/SideMenuAdmin'
import { AiOutlineDollar } from 'react-icons/ai'
import { HiShoppingCart } from 'react-icons/hi'
import { GiClothes } from 'react-icons/gi'
import { recentOrder } from '../../../data/products'
import Head from 'next/head'
import { Store } from '../../../store/Store'
import { useRouter } from 'next/router'

function Dashboard() {

  

  const cardDetails = [
    {
      text: 'Sales',
      number: 1236372.89,
      isDollar: true,
      color: '#FE9017',
      icon: AiOutlineDollar
    },
    {
      text: 'Orders',
      number: 129,
      isDollar: false,
      color: '#5BCD69',
      icon: HiShoppingCart
    },
    {
      text: 'Products',
      number: 1000,
      isDollar: false,
      color: '#3864E0',
      icon: GiClothes
    },
  ]
  
  const [mount, setMount] = useState<boolean>(false)
  const {state, dispatch} = useContext(Store)
  const router = useRouter()

  useEffect(() => {
    if (state.user) {
      if (!state.user.isAdmin) {
        console.log("You're not authorize!");
        router.push('/')
      }
    } else {
      console.log('Please login first!');
      router.push('/')
    }
  }, [])

  useEffect(() => {
    setMount(true)
  }, [])

  if (!mount) {
    return null
  }
  
  

  return (
    <div>
        <Head>
          <title>Admin - ORX Clothing</title>
          <meta name="description" content="ORX Clothing" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className='px-4 flex'>
            <SideMenuAdmin/>
            <div className='p-4 px-8 grow'>
              <p className=' text-xl font-semibold'>Howdy! Boss Mau</p>
              <div className='px-2 mt-4'>
                <p className='font-bold text-lg'>Dashboard</p>
                <div className='flex flex-col lg:flex-row gap-4 mt-4 justify-around'>
                  
                  {
                    cardDetails.map((card, i) => (
                      <AdminCard key={i} dollarSign={card.isDollar} icon={card.icon} color={card.color} text={card.text} number={card.number}/>
                    ))
                  }
                  
                </div>
                <p className='font-bold text-md mt-8'>Recent Orders</p>
                <div className='mt-2 overflow-x-auto'>
                  <table className='w-[100%] '>
                    <tbody>
                    {
                      recentOrder.map((order, i) => (
                        <tr key={i} className='border-b-[0.5px] h-10 border-zinc-300'>
                          <td>{i+1}</td>
                          <td className='font-semibold px-[15px]'>{order.name}</td>
                          <td className='text-right px-[8px]'>{order.email}</td>
                          <td className='text-right px-[8px]'>${order.cost.toLocaleString("en-US")}</td>
                          <td className='text-right px-[8px]'><span className={`bg-white text-[12px] py-1 px-2 rounded-lg ${order.status === 'delivered' ? 'text-green-600' : order.status === 'shipped' ? 'text-blue-600' : 'text-red-600'}`}>{order.status}</span></td>
                          <td className='text-right text-[11px] px-[8px] font-thin'>{order.time} hours ago</td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </main>
    </div>
  )
}

export default Dashboard