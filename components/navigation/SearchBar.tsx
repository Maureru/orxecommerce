import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs';


function SearchBar({search = "",setSearch}) {
    const control = useAnimation();
    const [isOpen, setIsOpen] = useState(false)
    const searchRef = useRef(null)

    const searchAnim = {
        hide: {
            opacity: 0,
            width: 0
        },
        show: {
            opacity: 1,
            width: 200,
            transition: {
                duration: 0.5
            }
        }
    }

    console.log(isOpen);

    const closeOut = (e) => {
        if (!searchRef.current.contains(e.target)) {
            control.start("hide")
            setIsOpen(false)
        }
    }

    useEffect(() => {
        addEventListener("mousedown", closeOut)
        return () => removeEventListener("mousedown", closeOut)
    }, [])
    
    const handleSearch = () => {
        if (isOpen) {
            console.log("SEARCHINGG");
            control.start("hide")
        } else {
            control.start("show")
        }
        setIsOpen(!isOpen)
    }

  return (
    <div id='searchbar' ref={searchRef} className={`hidden md:flex gap-2 items-center p-2 overflow-hidden rounded-2xl ${isOpen ? 'bg-white': 'bg-transparent'} transition duration-500`}>
        <form onSubmit={(e) => {
            e.preventDefault()
            setSearch
        }}>
            <motion.input value={search} onChange={setSearch} variants={searchAnim} initial="hide" animate={control} placeholder="Search" className='outline-none text-sm bg-transparent' type="text"/>
        </form>
        <BsSearch className='cursor-pointer' onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar