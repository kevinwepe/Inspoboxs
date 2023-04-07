import logo from '../assets/logo.png';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { logoutHandler } from '../slices/AuthSlice';

function Navbar({setlogin,setregister}) 
{
  
  const dispatch = useDispatch();
  const { auth:{ token, user } } = useSelector(state=>state);


  return (
   <div className='flex flex-row bg-white justify-between py-4 px-4'>
      <div className='flex flex-row items-center space-x-6'>
      <img className='items-center w-[54px]'src={logo}></img>
      <div className='flex flex-row items-center space-x-5'>
      <Link to="/">
      <p className='text-[#FF5AC7] font-semibold'>Home</p>
      </Link>
      <p className='text-[#6F6F6F] font-[400]'>Search</p>
      <p className='text-[#6F6F6F] font-[400]'>Categories</p>
      </div>
      </div>
     {token ? (
      <div className='flex items-center'>
       <Link to="/profile">
       <div className='flex items-center'>
        <span className={`w-[46px] text-white font-bold h-[46px] rounded-full bg-pink-500 flex items-center justify-center uppercase`}>
           {user?.username?.charAt(0)}
         </span>
         <p className='text-md font-medium ml-3'>{user?.display_name}</p>
          </div>
       </Link>

         <button onClick={()=>dispatch(logoutHandler())} className='text-pink-500 border border-pink-500 font-medium ml-7  py-2 px-4 text-sm rounded-full'>Logout</button>
         <Link to="/create">
          <button className="bg-pink-500 font-medium ml-3 text-white py-2 px-4 text-sm rounded-full">Create</button>
         </Link>
      </div>
     ) : (
       <div className='flex flex-row items-center space-x-4'>
       <button className='w-[60px] h-[35px] bg-[#FF5AC7] rounded-md ' onClick={()=>setlogin(true)}>
         <p className='font-semibold text-white'>Login</p>
         </button>
         <button className='w-[70px] h-[35px] rounded-md outline-1 outline outline-[#FF5AC7] hover:bg-[#FF5AC7] ' onClick={()=>setregister(true)}>
       <p className='text-[#FF5AC7] font-semibold hover:text-white'>Sign Up</p>
         </button>
       </div>
     )}
   </div>
  )
}

export default Navbar;
