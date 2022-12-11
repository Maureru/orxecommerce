import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import Button from '../../components/Misc/Button'
import { Store } from '../../store/Store'

function Login() {
    const {state, dispatch} = useContext(Store)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()

        await axios.post('/api/user/login', form).then((res) => {
            if (res.data.Error) {
                console.log(res.data.Error);
            } else {
                console.log(res.data);
                
                dispatch({type: 'LOGIN', payload: res.data})
                if (res.data.isAdmin) {
                    Cookies.set("accessToken", res.data.token)
                    router.push('/admin/dashboard')
                } else {
                    Cookies.set("accessToken", res.data.token)
                    router.push('/')
                }
            }
            
        })


    }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <form onSubmit={handleSubmit} className='flex rounded-lg bg-white p-4 w-[350px] flex-col gap-2'>
            <p className='text-3xl font-semibold text-center'>ORX <span className='text-[12px]'>LOGIN</span></p>
            <div>
                <p className='text-[13px] font-semibold'>Email</p>
                <div className='p-2  w-[100%] flex gap-2 items-center border-b-[1px]  border-zinc-400'>
                    <MdEmail className='text-zinc-400'/>
                    <input value={form.email} onChange={(e) => {setForm({...form, email: e.target.value})}} placeholder='Type your email' type="text" className='bg-transparent grow outline-none '/>
                </div>
            </div>
            <div className='mt-2'>
                <p className='text-[13px] font-semibold'>Password</p>
                <div className='p-2  w-[100%] relative flex gap-2 items-center border-b-[1px]  border-zinc-400'>
                    {
                        isPassVisible ? <AiFillEye onClick={() => {
                            setIsPassVisible(false)
                        }} className='absolute top-[50%] translate-y-[-50%] right-0 text-xl text-zinc-400 cursor-pointer'/> :
                        <AiFillEyeInvisible onClick={() => {
                            setIsPassVisible(true)
                        }} className='absolute top-[50%] translate-y-[-50%] right-0 text-xl text-zinc-400 cursor-pointer'/>
                    }
                    <RiLockPasswordFill className='text-zinc-400'/>
                    <input value={form.password} onChange={(e) => {setForm({...form, password: e.target.value})}} placeholder='Type your password' type={isPassVisible ? 'text' : 'password'} className='bg-transparent grow outline-none '/>
                </div>
            </div>
            
            <Button submit className='w-[100%] mt-2 p-2 bg-violet-800 text-white'>Login</Button>
            <p className='uppercase text-center text-[12px]'>or <span className='text-lg cursor-pointer font-semibold'>Sign up</span></p>
        </form>
    </div>
  )
}

export default Login