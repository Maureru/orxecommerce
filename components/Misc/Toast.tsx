import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react'
import { BsCheckCircleFill } from "react-icons/bs";
import { MdError } from "react-icons/md";






function Toast({toast = {text: '', type: 'success', on: false}, setToastDetails}) {

  const toastAnim = {
    hide: {
      opacity: 0
    },
    show: {
      x: [400, 0],
      opacity: 1,
      transition: {
        duration: 0.8
      }
    },
    exit: {
      x: [0, 400],
      opacity: 0,
      transition: {
        duration: 0.8
      }
    },
  }


  const control = useAnimation()

  useEffect(() => {
    
    if (toast.on) {
      control.start("show")
      setTimeout(() => {
        control.start("exit")
        setToastDetails({...toast, on: false})
      }, 3000)
    }
  
  }, [toast.on])
  
    
  return (
    <motion.div variants={toastAnim} initial="hide" animate={control} className='fixed z-50 top-16 right-5 flex gap-2 items-center rounded-xl p-2 bg-[#FF7B7B]'>
        <p className='font-semibold'>{toast.text}</p>
        {
          toast.type === 'success' ? <BsCheckCircleFill className=''/> : <MdError/>
        }
    </motion.div>
  )
}

export default Toast