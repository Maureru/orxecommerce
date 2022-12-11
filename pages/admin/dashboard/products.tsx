import axios from 'axios'
import { motion, useAnimation } from 'framer-motion'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import AddProduct from '../../../components/Misc/AddProduct'
import Button from '../../../components/Misc/Button'
import CardProduct from '../../../components/Misc/CardProduct'
import SideMenuAdmin from '../../../components/Misc/SideMenuAdmin'
import Toast from '../../../components/Misc/Toast'
import { Store } from '../../../store/Store'

function Products() {

  const [products, setProducts] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [search, setSearch] = useState('')


  const fetchAll = async () => {
    await axios.get('/api/product').then((res) => {
      setProducts(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }
  const fetchTop = async () => {
    await axios.get('/api/product/featured').then((res) => {
      setTopProducts(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }


  const fetchSearch = async () => {
    console.log("DW");
    await axios.post('/api/product/search', {search: search}).then((res) => {
      setProducts(res.data)
    }).catch((err) => {
      console.log(err);
      
    })
  }

  useEffect(() => {
    fetchTop()
  }, [])

  useEffect(() => {
    
    if (!search) {
      fetchAll()
    } else {
      fetchSearch()
    }
  }, [search])
  

  const anim = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    hide: {
      opacity: 0,
      scale: 0,
      transition: {
        ease: 'linear',
        duration: 0.5
      }
    },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: 'linear',
        duration: 0.5
      }
    },
  }
  
  
  const [isOpen, setIsOpen] = useState(false)

  const openAdd = () => {
    setIsOpen(true)
    
  }
  const closeAdd = () => {
    setIsOpen(false)
    
  }

  useEffect(() => {
    if (!isOpen) {
        document.body.style.overflow = "visible"
    } else {
        document.body.style.overflow = "hidden"
    }
}, [isOpen])

const [isEdit, setIsEdit] = useState(false)
const [editProduct, setEditProduct] = useState({
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

  return (
    <div>
        <main className='px-4 flex'>
          <Head>
          <title>Products - ORX Clothing</title>
          <meta name="description" content="ORX Clothing" />
          <link rel="icon" href="/favicon.ico" />
          </Head>
          <SideMenuAdmin active='Products'/>
          <div className='p-4 px-2 lg:px-8 w-[95%] relative'>
            
            <Toast toast={toastDetails} setToastDetails={setToastDetails}/>
            {isOpen ? <AddProduct isEdit={isEdit} editProduct={editProduct} isOpen={isOpen} close={closeAdd} toast={toast}/> : null}
            <p className='text-2xl font-semibold'>Products</p>
            <div className='mt-4 px-4'>
              <p className='text-lg font-semibold'>Top Selling</p>
              <div className='flex justify-center flex-wrap gap-4 mt-4'>
                {
                  topProducts.map((product, i) => (
                    <CardProduct key={i} setIsEdit={setIsEdit} product={product} openAdd={openAdd} setEditProduct={setEditProduct}/>
                  ))
                }
                
              </div>
              <div className='mt-16'>
                <div className='flex lg:flex-row flex-col items-end lg:items-center justify-end gap-4'>
                  <Button onClick={openAdd} className='px-4 py-1 bg-[#D3BDA0]'>Add Product</Button>
                  <form onSubmit={(e) => {
                    e.preventDefault()
                    fetchSearch()
                  }} className='flex items-center'>
                    <input value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder='Search Product' className='outline-none p-1 px-2'/>
                    <input value="Search" className='bg-[#D3BDA0] p-1 px-2 rounded-tr-md rounded-br-md cursor-pointer' type="submit"/>
                  </form>
                </div>
                <motion.div layout className='flex gap-4 mt-4 justify-center flex-wrap'>
                  {
                    products.map((product, i) => (
                      <CardProduct key={i} setIsEdit={setIsEdit} product={product} openAdd={openAdd} setEditProduct={setEditProduct}/>
                    ))
                  }
                </motion.div>
              </div>
            </div>
          </div>
        </main>
    </div>
  )
}

export default Products