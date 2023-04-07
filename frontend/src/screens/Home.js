 import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Register from "../components/Register";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import images from "../utils/images";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination,Autoplay } from "swiper";

function Home({ token ,setToken }) {
  const { posts:{ posts } } = useSelector(state=>state);

    const [login,setlogin]=useState (false)
    const [register,setregister]=useState (false)


  return (
    
   <div className="w-full min-h-screen">
      <Navbar setlogin={setlogin} setregister={setregister}/>
      <Login  setlogin={setlogin} login={login}/>
      <Register setlogin={setlogin} setregister={setregister} register={register}/>
      <section className="w-full">
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination,Autoplay]}
            className="mySwiper"
        >
           <SwiperSlide>
             <div className="w-full relative">
             <div className="w-full h-full absolute top-0 left-0" style={{backgroundColor:"rgba(10,10,10,0.3)"}}></div>
             <img src={images.banner1} alt='banner1' className="w-full object-cover h-[550px]"/>
             </div>
           </SwiperSlide>
           <SwiperSlide>
            <div className="w-full relative">
              <div className="w-full h-full absolute top-0 left-0" style={{backgroundColor:"rgba(10,10,10,0.3)"}}></div>
             <img src={images.banner2} alt='banner1' className="w-full object-cover h-[550px]"/>
            </div>
           </SwiperSlide>
           <SwiperSlide>
            <div className="w-full relative">
            <div className="w-full h-full absolute top-0 left-0" style={{backgroundColor:"rgba(10,10,10,0.3)"}}></div>
             <img src={images.banner3} alt='banner1' className="w-full object-cover h-[550px]"/>
            </div>
           </SwiperSlide>

        </Swiper>
      </section>
      <section className="w-full py-10 px-7  grid grid-cols-4 gap-x-3">
        {posts?.map((post, idx) => (
          <div className="w-full cursor-pointer" key={idx}>
            <img src={`http://127.0.0.1:8000/storage/posts_image/${post.image}`} alt={post.title} className="w-full h-[220px] rounded-lg" />
          </div>
        ))}
      </section>
   </div>
  )
}

export default Home;
