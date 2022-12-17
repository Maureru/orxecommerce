import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { OrxProducts } from '../../data/products'
import Button from './Button'

function AddProduct({isEdit = false, editProduct ,isOpen = false, close = () => {}, toast}) {

    const imageRef = useRef<HTMLInputElement>()
    const moreImageRef = useRef<HTMLInputElement>()

    const [product, setProduct] = useState({
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

    useEffect(() => {
        if (isEdit) {
            setProduct(editProduct)
        }
    }, [])


    

    const [color, setColor] = useState('#000000')
    const [size, setSize] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState(null)
    const [imagePrev, setImagePrev] = useState(null)
    const [moreImage, setMoreImage] = useState([])
    const [moreImagePrev, setMoreImagePrev] = useState([])
    const [mount, setMount] = useState(false)




    useEffect(() => {
        setMount(true)
        
    } ,[])



    if (!mount) {
        return null
    }
    
    const convertToSlug = (Text) =>
    {
        return Text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
            ;
    }

    const handleAddProduct = async () => {
        
        if (!isEdit) {
            if (product.name && product.description && product.countInStock && product.price && product.category.length > 0) {
    
                await axios.post('/api/product/add', product).then((res) => {
                    console.log("success");
                    console.log(product);
                    
                    if (res.data) {
                        console.log(res.data);
                        
                    }
                })
    
                toast('Product Added', "success")
                close()
                setProduct({
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
    
                
                
    
            } else {
                console.log("Enter required fields");
                toast('Enter required fields!', "error")
                
            }
        } else {
            if (product.name && product.description && product.countInStock && product.price && product.category.length > 0) {
    
                await axios.post('/api/product/edit', product).then((res) => {
                    console.log("success");
                    console.log(product);
                    
                    if (res.data) {
                        console.log(res.data);
                        
                    }
                })
    
                toast('Product Editted', "success")
                close()
                setProduct({
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
    
                
                
    
            } else {
                console.log("Enter required fields");
                toast('Enter required fields!', "error")
                
            }
        }
    }

    
    

  return (
    <div className='fixed top-0 z-[100] w-[100%] left-0 flex items-center justify-center bg-transparent h-[100vh]'>
        <input ref={imageRef} onChange={async (e) => {
            
            const data = new FormData()
            data.append('file', e.target.files[0]);
            data.append('upload_preset', 'ravens');
            await fetch('https://api.cloudinary.com/v1_1/de6tc8i8q/image/upload', {
            method: 'POST',
            body: data,
            }).then(async (res) => {
                const file = await res.json()
                setProduct({...product, image: file.secure_url})
            }).catch((err) => {
                console.log("Error Cloudinary");
            })
            setImage(e.target.files[0])
            setImagePrev(URL.createObjectURL(e.target.files[0]))
        }} type="file" hidden/>
        <input ref={moreImageRef} onChange={async(e) => {
            
            if (moreImage.length !== 5) {
                const data = new FormData()
                data.append('file', e.target.files[0]);
                data.append('upload_preset', 'ravens');
                await fetch('https://api.cloudinary.com/v1_1/de6tc8i8q/image/upload', {
                method: 'POST',
                body: data,
                }).then(async (res) => {
                    const file = await res.json()
                    setProduct({...product, moreImage: [...product.moreImage, file.secure_url]})
                }).catch((err) => {
                    console.log("Error Cloudinary");
                })
                setMoreImage([...moreImage, e.target.files[0]])
                setMoreImagePrev([...moreImagePrev, URL.createObjectURL(e.target.files[0])])
            }
        }} type="file" hidden/>
        <div className='bg-white relative overflow-y-auto over flex flex-col w-[1000px] p-8 h-screen rounded-lg'>
            <div onClick={close} className='absolute p-2 bg-white rounded-full cursor-pointer top-2 right-2 flex items-center justify-center'><AiOutlineClose/></div>
            <p className='font-bold'>Add Product</p>
            <div className='grid gap-2 grid-cols-2'>
                <div className='flex flex-col gap-2'>
                    <input value={product.name} onChange={(e) => {
                        setProduct({...product, name: e.target.value, slug: convertToSlug(e.target.value)})
                        
                    }} className='w-[100%] p-2 outline-none' placeholder='Name*'/>
                    <textarea value={product.description} onChange={(e) => {
                        setProduct({...product, description: e.target.value})
                    }} className='h-[100px] w-[100%] p-2 outline-none border border-zinc-600 rounded-md resize-none' placeholder='Details (Optional)'></textarea>
                </div>
                <div onClick={() => {
                    imageRef.current.click()
                }} className='relative border border-black cursor-pointer flex items-center justify-center h-[100%] overflow-hidden rounded-lg w-[100%]'>
                    {
                        image ? <Image src={imagePrev} layout="fill" objectFit="cover" alt="d"/> : <p className='text-6xl'>+</p>
                    }
                </div>
            </div>
            <div className='grid grid-cols-2 mt-2 gap-2'>
                <div className='grid grid-cols-2 gap-2'>
                    <input value={product.countInStock === 0 ? '' : product.countInStock} onChange={(e) => {
                        setProduct({...product, countInStock: parseInt(e.target.value)})
                    }} placeholder='Count in Stock' type="number" className='p-2 outline-none border-b-2'/>
                    <input value={product.price === 0 ? '' : product.price} onChange={(e) => {
                        setProduct({...product, price: parseInt(e.target.value)})
                    }} placeholder='Price $' type="number" className='p-2 outline-none border-b-2'/>
                </div>
                <input value={product.originalPrice === 0 ? '' : product.originalPrice} onChange={(e) => {
                        setProduct({...product, originalPrice: parseInt(e.target.value)})
                    }} placeholder='Original Price (If promo)' type="number" className='p-2 outline-none border-b-2'/>
            </div>
            <span onClick={() => {
                    moreImageRef.current.click()
                }} style={{boxShadow: '0px 10px 35px 3px rgba(0,0,0,0.1)'}} className='p-2 inline-block my-2 text-center cursor-pointer'>Add more image (Limit 5)</span>
            <div className='flex gap-3'>
                {
                    moreImagePrev.map((image, i) => (
                        <div key={i} className='h-16 w-16 relative rounded-md overflow-hidden'>
                    <Image src={image} layout="fill" objectFit="cover" alt="da"/>
                </div>
                    ))
                }
            </div>
            <p className='font-semibold mt-2'>Colors <span className='text-[11px]'>*Optional</span></p>
            <div className='flex gap-2 items-center'>
                <input value={color} onChange={(e) => {setColor(e.target.value)}} type="color"/>
                <p onClick={() => {
                    setProduct({...product, colors: [...product.colors, color]})
                    setColor('')
                }} className='bg-blue-400 px-2 cursor-pointer rounded-md font-semibold text-[14px]'>ADD</p>
            </div>
            <div className='flex gap-2 mt-2'>
                {
                    product.colors.map((color, i) => (
                        <div key={i} style={{backgroundColor: `${color}`}} className='w-10 h-10 rounded-full relative'><span onClick={() => {
                            const newColors = product.colors.filter((item) => !item.includes(color))
                            setProduct({...product, colors: newColors})
                        }} className='w-6 h-6 flex items-center justify-center absolute top-[-5px] cursor-pointer right-[-5px] border-2 border-black bg-white rounded-full text-[11px]'>X</span></div>
                    ))
                }
            </div>
            <p className='font-semibold mt-2'>Sizes/Width <span className='text-[11px]'>*Optional</span></p>
            <div className='flex gap-2 items-center'>
                <input value={size} onChange={(e) => {setSize(e.target.value)}} type="text" className='p-2 outline-none border-b-2' placeholder='Add Size'/>
                <p onClick={() => {
                    setProduct({...product, sizes: [...product.sizes, size]})
                    setSize('')
                }} className='bg-blue-400 px-2 cursor-pointer rounded-md font-semibold text-[14px]'>ADD</p>
            </div>
            <div className='flex gap-4 mt-2'>
                {
                    product.sizes.map((size, i) => (
                        <span key={i} className='uppercase py-1 px-2 outline-dashed relative'><span onClick={() => {
                            const newSizes = product.sizes.filter((item) => !item.includes(size))
                            setProduct({...product, sizes: newSizes})
                        }} className='w-6 h-6 flex items-center justify-center absolute top-[-15px] right-[-15px] border-2 cursor-pointer border-black bg-white rounded-full text-[11px]'>X</span>{size}</span>
                    ))
                }
            </div>
            <div className='flex gap-2 mt-2'>
                <div>
                    <p className='font-semibold mt-2'>Category</p>
                    <div className='flex gap-2 items-center'>
                        <input value={category} onChange={e => {setCategory(e.target.value)}} type="text" className='p-2 w-[150px] outline-none border-b-2' placeholder='Add Category'/>
                        <p onClick={() => {
                            setProduct({...product, category: [...product.category, category]})
                            setCategory('')
                        }} className='bg-blue-400 px-2 cursor-pointer rounded-md font-semibold text-[14px]'>ADD</p>
                    </div>
                    </div>
                    <div>
                </div>
                <div className='flex flex-wrap gap-2 items-end'>
                    {
                        product.category.map((cat, i) => (
                            <div key={i} style={{boxShadow: '0px 0px 12px 8px rgba(0,0,0,0.1)'}} className="p-1 px-2 rounded-md relative"><span onClick={() => {
                                const cats = product.category.filter((item) => !item.includes(cat))
                                setProduct({...product, category: cats})
                            }} className='w-4 h-4 flex items-center justify-center absolute top-[-7px] right-[-7px] border-2 cursor-pointer border-black bg-white rounded-full text-[11px]'>X</span>{cat}</div>
                        ))
                    }
                </div>
            </div>
            <Button onClick={handleAddProduct} className='mt-4 p-2 bg-[#D3BDA0]'>{isEdit ? 'Update' : 'Add'} Product</Button>
        </div>
    </div>
  )
}

export default AddProduct