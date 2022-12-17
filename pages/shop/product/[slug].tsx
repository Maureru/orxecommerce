import axios from 'axios'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Button from '../../../components/Misc/Button';
import ColorSelector from '../../../components/Misc/ColorSelector';
import ImagePreview from '../../../components/Misc/ImagePreview';
import RateIt from '../../../components/Misc/RateIt';
import Rating from '../../../components/Misc/Rating';
import Navigation from '../../../components/navigation';
import { OrxProducts } from '../../../data/products';
import { Store } from '../../../store/Store';
import { FaPaperPlane } from "react-icons/fa";
import Image from 'next/image';
import Toast from '../../../components/Misc/Toast';
import { BraintreePayPalButtons, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';


/* export async function getServerSideProps(context) {
  
  
  const res = await fetch(`http://localhost:3000/api/product/${context.params.slug}`)
  const data = await res.json();

  

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      producto: data
    }
  }

} */


function Product() {
    const router = useRouter()
    const [mount, setMount] = useState(false)

    
    

    const {state ,dispatch} = useContext(Store);

    const [product, setProduct] = useState<OrxProducts>({
        _id: null,
        name: '',
        slug: '',
        category: [],
        colors: [],
        description: '',
        image: '',
        moreImage: [],
        price: 0,
        originalPrice: 0,
        countInStock: 0,
        rating: 0,
        sizes: [],
        numReviews: 0,
        numSold: 0
    })

    const [addCart, setAddCart] = useState({
      _id: '',
      name: '',
      image: '',
      price: 0,
      stock: 0,
      quantity: 1,
      color: '',
      size: ''
    })

    const [reviewForm, setReviewForm] = useState(
      {
        user: '',
        product: '',
        productSlug: '',
        rating: 0,
        message: '',
        isAdmin: false,
      }
    )

    const [reviews, setReviews] = useState([])

    const [star, setStar] = useState<number>(0)
    
    const setSelectedColor = (color) => {
      setAddCart({ ...addCart, color: color})
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
      const fetchReview = async () => {
        await axios.post(`/api/review/get`, {
        productSlug: router.query.slug
      }).then((res) => {
        if (res.data.Error) {
          
          
          
        } else {
          setReviews(res.data)
          
          
        }
      })
    }
      const fetchProduct = async () => {
        await axios.get(`/api/product/${router.query.slug}`).then((res)=> {setProduct(res.data); setAddCart({...addCart, _id: res.data._id, name: res.data.name, stock: res.data.countInStock, image: res.data.image, price: res.data.price})}).catch((err) => {console.log(err);
        });
    }

    
        
      if (router.isReady) {
        fetchReview()
        fetchProduct()
        
        
      }

    }, [router.isReady])
    console.log(reviews, "PPPPPPPPPPPPPPPPPp");
    useEffect(() => {
      setMount(true)
    },[])
    var ratings = 0
    reviews?.map((rev, i) => {
          ratings = ratings + rev.rating
      })
    

    const handleAddCart = () => {
      
      
      if (product.colors.length > 0 || product.sizes.length > 0) {
        if (product.colors.length > 0 && product.sizes.length === 0) {
          if(!addCart.color) {
            toast('Please choose a color', 'error')
            console.log("Please choose a color")
          } else {
            dispatch({type: 'ADD_TO_CART', payload: addCart})
            toast('Added to Cart', 'success')
          }
        } else if (product.sizes.length > 0 && product.colors.length === 0) {
          if(!addCart.size) {
            toast('Please choose a size', 'error')
            console.log("Please choose a size")
          } else {
            toast('Added to Cart', 'success')
            dispatch({type: 'ADD_TO_CART', payload: addCart})
          }
        } else {
          if(!addCart.color) {
            toast('Please choose a color', 'error')
            console.log("Please choose a color")
          } else if (!addCart.size) {
            toast('Please choose a size', 'error')
            console.log("Please choose a size")
          } else {
            toast('Added to Cart', 'success')
            dispatch({type: 'ADD_TO_CART', payload: addCart})
          }
        }
      } else {
        toast('Added to Cart', 'success')
        dispatch({type: 'ADD_TO_CART', payload: addCart})
      }
    }

    const handleStar = (e: number) => {
      setReviewForm({...reviewForm, rating: e})
    }


    const handleSubmitReview = async (e) => {
      e.preventDefault();
      setReviewForm({...reviewForm, product: product._id, productSlug: `${router.query.slug}`, user: state.user._id, rating: star, isAdmin: state.user.isAdmin})
      if (!reviewForm.rating) {
        toast("Please add a star", "error")
      } else {
        await axios.post("/api/review/post", reviewForm).then((res) => {
          if (res.data.Error) {
            toast(res.data.Error, "error")
          } else {
            toast("You made a review", "success")
            console.log(res.data);
            
            setReviews([...reviews, res.data])
          }
        })
      }
    }

    if (!mount) {
      return <></>
    }


  return (
    <div>
      <Head>
        <title>{product.name} | ORX Clothing</title>
        <meta name="description" content={`${product.name} - ORX Clothing`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
        <Toast toast={toastDetails} setToastDetails={setToastDetails}/>
        {/* <RateIt starNumber={star} setStarNumber={(num: number) => {setStar(num)}}/> */}
        <main className='grid xl:grid-cols-2 gap-2 px-4 md:px-8 lg:px-20 '>


          <div id='productImage' className='xl:sticky top-0 pt-20 left-0 h-auto xl:h-screen'>
            <ImagePreview product={product}/>
          </div>




          <div className='p-4 xl:pt-20'>
            <p className='text-4xl font-bold'>{product.name}</p>
            <div className='flex gap-2 flex-wrap'>
              {
                product.category ? product.category.map((cat, i) => (
                  <div key={i} className='p-1 inline-block mt-2 border-gray-800 border-[1px]'>{cat}</div>
                )) : null
              }
            </div>
            <div className='flex gap-2 mt-2 items-center font-semibold'>
              {
                product.originalPrice !== 0 ? <p className='line-through text-3xl italic text-red-400'>${product.originalPrice}</p> : null
              }
              <p className='text-4xl'>${product.price}</p>
            </div>
            <div className='flex mt-2 gap-2 items-center'>
              <Rating rating={ratings/reviews.length}/>
              <p className='italic text-md'>Read Reviews ({reviews.length})</p>
              
            </div>
            {
              product.colors.length > 0 ? 
              <div className='mt-4'>
              <p className='text-lg font-semibold'>Select color/style</p>
              <ColorSelector 
              colors={product.colors}
              addCart = {addCart}
              setAddCart = {setAddCart}
              />
            </div> : null
            }
            {
              product.sizes.length > 0 ?
              <div className='mt-4'>
              <p className='text-lg font-semibold'>Select size/width</p>
              <div className='flex flex-wrap gap-4 mt-4'>
                {
                  product ? product.sizes.map((size, i) => (
                    <p className={`uppercase py-2 px-4 outline-dashed cursor-pointer ${size === addCart.size ? 'bg-[#D6BFA2]' : null}`} onClick={() => {
                      setAddCart({...addCart, size: size})
                    }} key={i}>{size}</p>
                  )) : null
                }
              </div>
            </div> : null
            }
            <div id='divider' className='flex my-4 gap-2 items-center'>
                <div className='grow h-[0.5px] bg-slate-600'/>
                <p className='text-sm'>ORX CLOTHING</p>
                <div className='grow h-[0.5px] bg-slate-600'/>
            </div>
            <div className='flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between'>
              <div id='quantity' className='flex gap-2 items-center'>
                <p className='text-lg font-medium'>Quantity</p>
                <input type="number" value={addCart.quantity} min="1" max={product.countInStock} className='p-2 flex'/>
                <div className='flex flex-col gap-1'>
                  <div className='px-4 py-1 rounded-lg bg-[#D6BFA2] cursor-pointer' onClick={() => {
                    addCart.quantity < product.countInStock ? setAddCart({...addCart, quantity: addCart.quantity + 1}) : null
                  }}>+</div>
                  <div className='px-4 py-1 rounded-lg bg-[#D6BFA2] cursor-pointer' onClick={() => {
                    addCart.quantity > 1  ? setAddCart({...addCart, quantity: addCart.quantity - 1}) : null
                  }}>-</div>
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div id='price'>
                  <p className='text-2xl font-semibold'>${product.price * addCart.quantity}</p>
                </div>
                <Button className='px-8 py-2 bg-[#594A98] text-white' onClick={handleAddCart}>Add to cart</Button>
              </div>
              
            </div>
            {/* <PayPalScriptProvider options={{ "client-id": "ARphk-P4T1W_JGwOQlyk0ZjIF3UJPdy3K0kaW-Iij9jzFyd9W1N4xmh_jfgDlHkJhGHeGL23NJasMr7x", }}>
              <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "1.99",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        const name = details.payer.name.given_name;
                        alert(`Transaction completed by ${name}`);
                    });
                }}
            />

        </PayPalScriptProvider> */}
            <div className='mt-4'>
              <p className='font-semibold text-lg'>Description</p>
              <div className='p-2'>
                  <p>{product.description}</p>
              </div>
            </div>
            <div className='mt-8'>
              
              <div className='pt-4'>
                <div id='postReview'>
                  <p className='mb-2'>Post a review</p>
                  <RateIt starNumber={reviewForm.rating} setStarNumber={handleStar}/>
                  <form onSubmit={handleSubmitReview}>
                    <div className='relative'>
                      <textarea value={reviewForm.message} onChange={(e) => {
                        setReviewForm({...reviewForm, message: e.target.value})
                      }} placeholder='Describe (Optional)' className='p-2 mt-2 outline-none resize-none w-[100%] h-24'>

                      </textarea>
                      <Button className='absolute bottom-2 right-2 p-2 rounded-full hover:ring-0' submit><FaPaperPlane/></Button>
                    </div>
                  </form>
                  {
                    reviews.length > 0 ? <p className='mb-2'>Reviews ({reviews.length})</p> :
                    <p className='mb-2'>No reviews yet</p>
                  }
                  <div>
                    {
                      reviews?.map((review, i) => (
                        <div key={i} id='review' className='border-b-2 border-zinc-700 pt-2 pb-4'>
                      <div className='flex items-center gap-2'>
                        <div className='relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden'>
                          {/* <Image src={product.image} alt='mm' layout='fill' objectFit='cover' /> */}
                          <p className='text-xl font-bold'>{review.user.name.slice(0,1)}</p>
                        </div>
                        <div className='flex relative flex-col justify-center items-center'>
                          <p className='absolute top-0 right-[-4rem] bg-zinc-300 text-[#00892c] py-1 px-2 rounded-md text-[11px]'>Admin</p>
                          <p>{review.user.name}</p>
                          <Rating rating={review.rating} starSize="text-md"/>
                        </div>
                      </div>
                      <p className='mt-4 px-8'>{review.message}</p>
                    </div>
                      ))
                    }
                    
                    
                    
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </main>
    </div>
  )
}

export default Product