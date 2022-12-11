import React from 'react'

import Icon from './Icon'

function AdminCard({icon ,color = '#FB923C', text = "", number= 0, dollarSign=false}) {
  return (
    <div style={{boxShadow: '0px 0px 23px 4px rgba(0,0,0,0.1)'}} className='flex gap-2 lg:w-[200px] xl:w-[300px] items-center bg-[#F7F7F7] p-4 rounded-lg'>
        <div style={{backgroundColor: color}} className={`w-16 h-16 rounded-full text-white text-4xl flex items-center justify-center`}><Icon as={icon}/></div>
        <div>
            <p className='text-sm font-thin'>Total {text}</p>
            <p className='font-bold text-lg'>{dollarSign && '$'}{number.toLocaleString('en-US')}</p>
        </div>
    </div>
  )
}

export default AdminCard