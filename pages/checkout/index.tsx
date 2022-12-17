import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../components/Misc/Button'
import { Countries } from '../../data/countries'
import { Store } from '../../store/Store'
import loader from '../../public/loading.svg'
import Head from 'next/head'
import Toast from '../../components/Misc/Toast'
import axios from 'axios'

function Checkout() {
  const router = useRouter()
  const {state, dispatch} = useContext(Store)

  const {cart: {cartItems, shippingAddress}} = state
  const [step, setStep] = useState(1)
  const [loaders, setLoaders] = useState(false)

  const [order, setOrder] = useState({
    user: null,
    orderItems: [],
    shippingAddress: {},
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    isPaid: false, 
    isDelivered: false
  })

  const [shippingForm, setShippingForm] = useState({
      fullName: shippingAddress ? shippingAddress.fullName : '',
      streetAddress: shippingAddress ? shippingAddress.streetAddress : '',
      streetAddress2: shippingAddress ? shippingAddress.streetAddress2 : '',
      city: shippingAddress ? shippingAddress.city : '',
      state: shippingAddress ? shippingAddress.state : '',
      postalCode: shippingAddress ? shippingAddress.postalCode : '',
      country: shippingAddress ? shippingAddress.country : '',
      phone: shippingAddress ? shippingAddress.phone : '',
      email: shippingAddress ? shippingAddress.email : ''
  })

  const inputOnchange = (e) => {
    setShippingForm({...shippingForm, [e.target.name] : e.target.value})
  }

  console.log(shippingForm);
  
  const shippingPage = () => {
    return (
      <div className='w-[100%] md:w-[25rem] p-4'>
            <div className='px-4 flex justify-end'>
              <p className='text-[10px]'>* required fields</p>
            </div>
            <form onSubmit={handleSubmit}>
              <p className='font-semibold'>Personal Info</p>
              <input type="text" name='fullName' onChange={inputOnchange} value={shippingForm.fullName} placeholder='Full Name *' className='p-2 w-[100%] outline-none border-b border-zinc-500'/>
              <input type="text" name='email' onChange={inputOnchange} value={shippingForm.email} placeholder='Email *' className='p-2 w-[100%] outline-none border-b border-zinc-500'/>
              <input type="number" name='phone' onChange={inputOnchange} value={shippingForm.phone} placeholder='Phone Number *' className='p-2 w-[100%] outline-none border-b border-zinc-500'/>
              <p className='font-semibold mt-4'>Shipping Info</p>
              <input type="text" name='streetAddress' onChange={inputOnchange} value={shippingForm.streetAddress} placeholder='Street Address *' className='p-2 w-[100%] outline-none border-b border-zinc-500'/>
              <input type="text" name='streetAddress2' onChange={inputOnchange} value={shippingForm.streetAddress2} placeholder='Address Line 2' className='p-2 w-[100%] outline-none border-b border-zinc-500'/>
              <div className='grid gap-2 grid-cols-2'>
                <input type="text" name='city' onChange={inputOnchange} value={shippingForm.city} placeholder='City *' className='p-2 w-[100%] outline-none border-b border-zinc-500'/>
                <input type="text" name='state' onChange={inputOnchange} value={shippingForm.state} placeholder='State/Province *' className='p-2 w-[100%] outline-none border-b border-zinc-500'/>
              </div>
              <div className='grid gap-2 grid-cols-2 mt-2'>
                <input type="text" name='postalCode' onChange={inputOnchange} value={shippingForm.postalCode} placeholder='Postal Code/Zip Code*' className='p-2 w-[100%] outline-none border-b border-zinc-500'/>
                <select value={shippingForm.country} onChange={(e) => {
                  setShippingForm({...shippingForm, country: e.target.value})
                }} className='rounded-md text-center bg-[#E8DDCC]'>
                  <option value="">--Choose a Country--</option>
                  {
                    Countries.map((country, i) => (
                      <option value={country.name} key={i} >{country.name}</option>
                    ))
                  }
                </select>
              </div>
              <Button submit className='p-2 mt-4 w-[100%] bg-[#E8DDCC]'>Next</Button>
              <Button onClick={() => {
                router.push("/")
              }} className='p-2 mt-4 w-[100%] bg-red-400 text-white'>Cancel</Button>
            </form>
          </div>
    )
  }

  const paymentPage = () => {
    return (
      <div className='block lg:grid grid-cols-2 p-2 w-screen lg:w-auto gap-2 lg:max-h-[90vh] overflow-y-auto'>
            <div className='p-2'>
              <p className='mb-2 font-semibold text-lg'>Review your order</p>
              {
                cartItems.map((cartItem, i) => (
                  <div key={i} className='mt-2 px-2 flex gap-2 max-w-[30rem]'>
                <div className='overflow-hidden rounded-sm'>
                  <Image src={cartItem.image} alt="" height={40} width={40}/>
                </div>
                <div className='flex flex-col justify-center'>
                  <p className='text-[12px]'>{cartItem.name.slice(0,60)}{cartItem.name.length > 60 ? '...' : null}</p>
                  <p className='italic font-semibold'>${cartItem.price} <span className='text-[10px]'>x{cartItem.quantity}</span></p>
                </div>
              </div>
                ))
              }
              
             
            </div>
            <div className='p-2 lg:w-[30rem]'>
              <div style={{margin: '0 auto'}} className='w-[90%]'>
                <p className='uppercase font-semibold'>Summary</p>
                <div className='w-[100%] h-[1.5px] bg-zinc-300 my-2'/>
                <div className='px-3 flex justify-between'>
                  <p>Items total</p>
                  <p>${total}</p>
                </div>
                <div className='px-3 mt-2 flex justify-between'>
                  <p>Shipping fee</p>
                  <p>${shippingFee}</p>
                </div>
                <div className='w-[100%] h-[1.5px] bg-zinc-300 my-2'/>
                <div className='flex mb-2 justify-end px-3'>
                  <p className='text-xl font-bold'>${total + shippingFee}</p>
                </div>
              </div>
              <div>
                <PayPalScriptProvider options={{ "client-id": "ARphk-P4T1W_JGwOQlyk0ZjIF3UJPdy3K0kaW-Iij9jzFyd9W1N4xmh_jfgDlHkJhGHeGL23NJasMr7x", }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: `${total + shippingFee}`,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async(data, actions) => {
                        
                        
                        
                        return await actions.order.capture().then(async(details) => {
                            const name = details.payer.name.given_name;
                            await axios.post('/api/order/add' , order).then((res) => {
                              dispatch({type: 'CLEAR_CART'})
                              router.push(`/checkout/order/${res.data._id}`)
                            }).catch((err) => {
                              console.log(err);
                              
                            })
                            
                        });
                    }}
                />

              </PayPalScriptProvider>
              </div>
      </div>

            
          </div>
    )
  }

      /* ======================TOAST============================ */
      const [toastDetails, setToastDetails] = useState({
        text: '',
        type: 'success',
        on: false
      })
  
      
      const toast = (text, type) => {
        setToastDetails({
          text: text,
          type: type,
          on: true
        })
      }
      /* =================================================== */

  useEffect(() => {
    if (state.user) {
      setOrder({...order, user: state.user._id})
    }
    if (cartItems.length === 0) {
      console.log('Empty Cart');
      router.push("/")
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setOrder({...order, orderItems: cartItems, shippingAddress: shippingForm, itemsPrice: total, shippingPrice: shippingFee, totalPrice: shippingFee + total, isPaid: true})
    if (!shippingForm.fullName || !shippingForm.email || !shippingForm.phone || !shippingForm.streetAddress || !shippingForm.city || !shippingForm.state || !shippingForm.postalCode || !shippingForm.country) {
      toast("Please fill all required fields", "error")
      
    } else {
      dispatch({type: 'ADD_SHIPPING', payload: shippingForm})
      setLoaders(true)
      setTimeout(() => {
        setLoaders(false)
        setStep(2)
      }, 500)
      

    }
  }
  console.log(order);
  
  var total = 0;
  cartItems.map((item) => {
    const cost = item.price * item.quantity
    total = total + cost;
  })

  const shippingFee = 25

  return (
    <div className='flex h-auto md:h-screen items-center justify-center'>
      <Head>
        <title>{step === 1 ? "Shipping - ORX" : "Payment - ORX"}</title>
        <meta name="description" content={`${step === 1 ? "Shipping - ORX" : "Payment - ORX"} - ORX Clothing`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast toast={toastDetails} setToastDetails={setToastDetails}/>
        {
          loaders ? <Image src={loader} alt='' width={80} height={80}/> :
          <div className='bg-white rounded-md overflow-hidden w-auto h-auto'>
          <div className='w-[100%] grid grid-cols-2 h-10 bg-white'>
            <div onClick={() => {
              setLoaders(true)
              setTimeout(() => {
                setStep(1)
                setLoaders(false)
              }, 500)
            }} className={`cursor-pointer flex justify-center ${step === 2 ? 'bg-[#E8DDCC]' : 'bg-white'} font-semibold items-center`}>
              Shipping
            </div>
            <div className={`flex justify-center ${step === 1 ? 'bg-[#E8DDCC]' : 'bg-white'} font-semibold items-center`}>
              Payment
            </div> 
          </div>
          
          {
            step === 1 ? shippingPage() : paymentPage()
          }
          
        </div>
        }
    </div>
  )
}

export default Checkout