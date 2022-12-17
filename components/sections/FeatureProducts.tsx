import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Corousel from '../Misc/Corousel'
import ProductCard from '../Misc/ProductCard'


function FeatureProducts() {

    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        await axios.get('/api/product/featured').then((res) => {
            setProducts(res.data)
        }).catch((err) => {
            console.log(err);
            
        })
    };

    useEffect(() => {
        fetchProducts()
    }, [])

  return (
    <div className='mt-8 px-4 lg:px-0'>
        <p className='text-2xl font-bold mb-4'>Featured Products</p>  
        <Corousel>
            {
                products.map((product, i) => (
                    <div key={i}>
                        <Link href={`/shop/product/${product.slug}`}><ProductCard product={product}/></Link>
                    </div>
                ))
            }
        </Corousel>
    </div>
  )
}

export default FeatureProducts