import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import axios from 'axios';
import Alert from './Alert';
import { registerHandler } from '../slices/AuthSlice';

function Register ({setregister,register,setlogin}) 
{
    const dispatch = useDispatch();
    const { alert,auth } = useSelector(state=>state);

    const [registerForm,setRegisterForm] = useState({
        email:"",
        password:"",
        confirm:"",
        display_name:"",
        username:""
    })

    const submitHandler = async (e) =>{ 
        e.preventDefault();
        dispatch(registerHandler({ registerForm,dispatch,setlogin,setregister }));

    }

    const changeHandler = (e) => setRegisterForm({...registerForm , [e.target.name]:e.target.value});

    if (!register) return 
    
    return (
<div style={{backgroundColor:'rgba(0,0,0,0.5)'}} className='z-[9999] fixed top-0 left-0 h-screen w-full' onClick={(e)=>{
    if (e.target.className.includes("fixed"))
    {
        setregister(false);
    }
}}>
        <div className=' form flex items-center justify-start top-[50%] translate-y-[-50%] min-h-min w-[400px] flex-col bg-white py-12 pb-12 py- absolute left-[50%] translate-x-[-50%] rounded-md'>
        {alert.open ? <Alert/> : null}
        <img src={logo} className='w-18'></img>
        <h1>Welcome to Inspobox</h1>
        <h2>Finds new idea to try</h2>
        <div className='py-2 space-y-2'>
        <div className='flex justify-start '>
        <input onChange={changeHandler} name="email" className='outline outline-1 rounded w-[250px] h-[30px] flex justify-start px-2 py-1 font-light text-[#6F6F6F]' placeholder='Email'></input>
        </div>
        <div className='flex justify-start '>
        <input onChange={changeHandler} name="display_name" className='outline outline-1 rounded w-[250px] h-[30px] flex justify-start px-2 py-1 font-light text-[#6F6F6F]' placeholder='Display Name'></input>
        </div>
        <div className='flex justify-start '>
        <input onChange={changeHandler} name="username" className='outline outline-1 rounded w-[250px] h-[30px] flex justify-start px-2 py-1 font-light text-[#6F6F6F]' placeholder='Username'></input>
        </div>
        <div className='flex justify-start '>
        <input onChange={changeHandler} name="password" type="password" className='outline outline-1 rounded w-[250px] h-[30px] flex justify-start px-2 py-1 font-light text-[#6F6F6F]' placeholder='Create Password'></input>
        </div>
        <div className='flex justify-start flex-col'>
        <input onChange={changeHandler} name="confirm" type="password" className='outline outline-1 rounded w-[250px] h-[30px] flex justify-start px-2 py-1 font-light text-[#6F6F6F]' placeholder='Confirm Password'></input>
        <p className='text-[#6F6F6F] font-bold text-xs py-1'>Forgot your password?</p>
        </div>
        <div className='flex items-center flex-col py-4'>
            <button onClick={submitHandler} className='flex flex-row justify-center items-center bg-[#FF5AC7] w-[250px] h-[35px] px-4 rounded-md'>
             <p className='font-semibold text-white'>Create Account</p>
            </button>      
        </div>
        </div>
    </div>
</div>
    )
  }
export default Register;