import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import OrderRow from '../../../components/Misc/OrderRow'
import SideMenuAdmin from '../../../components/Misc/SideMenuAdmin'
import { Store } from '../../../store/Store'

function Orders() {

  const [orders, setOrders] = useState([])
  const [mount, setMount] = useState(false)

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
    const fetchOrders = async () => {
      await axios.get('/api/order/getAll').then((res) => {
        setOrders(res.data)
      })
    }
    fetchOrders()
  }, [])

  console.log(orders);
  
  if (!mount) {
    return <></>
  }

  return (
    <div>
        <Head>
          <title>Orders - ORX Clothing</title>
          <meta name="description" content="ORX Clothing" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className='px-2 md:px-4 flex'>
            <SideMenuAdmin active='Orders'/>
            <div className='p-4 px-4 md:px-8 grow'>
                <p>Orders</p>
                <table className='w-[100%]'>
                  <tbody>
                    {orders.map((order, i) => (
                      <OrderRow order={order} key={i}/>
                    ))}
                  </tbody>
                </table>
            </div>
        </main>
    </div>
  )
}

export default Orders