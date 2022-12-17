
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
import Link from 'next/link'
import axios from 'axios'

function Customer() {

  

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
  const [customers, setCustomers] = useState([])

  const fetchCustomers = async () => {
    await axios.get('/api/user/customers').then((res) => {
      setCustomers(res.data)
    })
  }

  

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
    fetchCustomers()
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
        <main className='px-2 md:px-4 flex'>
            <SideMenuAdmin active='Customer'/>
            <div className='p-4 px-4 md:px-8 grow'>
              <p>Customer</p>
              <table className='w-[100%] mt-4 overflow-x-auto'>
                <thead>
                  <tr className=' bg-[#D3BDA0] rounded-tr-md'>
                    <th className='p-2 text-left'>Name</th>
                    <th className='text-right'>Email</th>
                    <th className='text-right'>Items Bought</th>
                    <th className='p-2 text-right'>Total Spent ($)</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {
                    customers.map((customer, i) => (
                      <tr key={i}>
                    <td className='font-bold px-2'>{customer.name}</td>
                    <td className='text-right font-thin'><Link href={`mailto: ${customer.email}`}>redstone@gmail.com</Link></td>
                    <td className='text-right'>{customer.itemsBought > 0 ? `${customer.itemsBought} items` : 'None'}</td>
                    <td className='text-right font-semibold px-2 py-2'>${customer.totalSpent.toLocaleString('en-US')}</td>
                  </tr>
                    ))
                  }
                  
                  
                </tbody>
              </table>
            </div>
        </main>
    </div>
  )
}

export default Customer