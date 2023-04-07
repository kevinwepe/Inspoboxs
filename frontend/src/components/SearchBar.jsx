
import React from 'react'

const SearchBar = ({ setSearch,searchHandler }) => {
 
  return (
    <div onClick={(e) => {
       if(e.target.className.includes("inside")) {
         setSearch(false);
       }
    }} className='inside absolute top-0 left-0 w-full py-10 z-[9999] px-7' style={{
      backgroundColor:'rgba(10,10,10,0.6)'
    }}>
      <input onKeyUp={searchHandler} type="text" className='w-full py-2 px-3 rounded-md outline-none bg-white'/>
    </div>
  )
}

export default SearchBar