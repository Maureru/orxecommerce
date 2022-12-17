import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import OrderRow from '../../../components/Misc/OrderRow'
import SideMenuAdmin from '../../../components/Misc/SideMenuAdmin'

function Orders() {

  const [orders, setOrders] = useState([])
  const [mount, setMount] = useState(false)

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