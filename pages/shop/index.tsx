import axios from 'axios'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/Misc/ProductCard'
import ShopProductCard from '../../components/Misc/ShopProductCard'
import Navigation from '../../components/navigation'

function Shop() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('');

  const setSearchValue = (e) => {
    setSearch(e.target.value)
  }

  const fetchAllProducts = async () => {
    await axios.get('/api/product').then((res) => {
      setProducts(res.data)
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
    if (!search) {
      fetchAllProducts()
    } else {
      fetchSearch()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  
  

  return (
    <div>
        <Head>
          <title>Shop - ORX Clothing</title>
          <meta name="description" content="ORX Clothing" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navigation search={search} setSearch={setSearchValue}/>
        <main className='h-6 px-4 sm:px-16 md:px-20 mt-20'>
          <p className='text-4xl font-bold'>Shop</p>
          <motion.div layout className='flex justify-center flex-wrap gap-4 mt-4'>
            {
              products.map((product, i) => (
                <Link href={`shop/product/${product.slug}`} key={i}>
                  <ShopProductCard product={product}/>
                </Link>
              ))
            }
          </motion.div>
        </main>
    </div>
  )
}

export default Shop