import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { MdMarkEmailRead } from 'react-icons/md'

function Order() {
  const router = useRouter()
  return (
    <div className='h-screen flex justify-center items-center'>
      <Head>
        <title>Order No. {router.query.id}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div>
            <p className='text-5xl text-center font-bold flex justify-center gap-2 items-center'>Thank You. <BsFillCheckCircleFill/></p>
            <p className='text-center text-2xl mt-6'>Your order was completed successfuly</p>
            <p className='text-center'>Order Number: <span className='font-semibold'>{router.query.id}</span></p>
            <div className='flex p-4 w-[100%] md:w-[39rem] gap-2 items-center'>
                <MdMarkEmailRead className='text-8xl'/>
                <p>An email reciept including the details about your order has been sent to the email address you provided. Please keep it for your record. Thank you!</p>
            </div>
            <p className='text-center'>Go to <Link href="/" className='font-bold'>Homepage</Link></p>
        </div>
    </div>
  )
}

export default Order