import {
  Navbar,
  Login,
  Register,
  PostDetail,
  SearchBar
 } from "../components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import images from "../utils/images";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination,Autoplay } from "swiper";
import { GetProfilePosts } from "../slices/ProfileSlice";
import { SearchHandler } from "../slices/PostSlice";

function Home({ token ,setToken }) {
  const dispatch = useDispatch();
  const { auth, posts:{ posts,loading } } = useSelector(state=>state);

    const [detailPost,setDetailPost] = useState(false);
    const [search,setSearch] = useState(false);
    const [login,setlogin]=useState (false)
    const [register,setregister]=useState (false)
    const [post,setPost] = useState(null);

    const [searchTerm,setSearchTerm] = useState("");

    useEffect(() => {
      if(post){
        const findPost = posts.find((postItem)=>postItem.id == post.id)
        setPost(findPost);
      }

    }, [posts]);

    const searchHandler = (e) => {
        if(e.keyCode === 13) {
            dispatch(SearchHandler({ searchTerm:e.target.value,setSearch }));
        }
    }

  return (
    
   <div className="w-full min-h-screen">
      <Navbar setSearch={setSearch} setlogin={setlogin} setregister={setregister}/>
      <Login  setlogin={setlogin} login={login}/>
      <Register setlogin={setlogin} setregister={setregister} register={register}/>
      
      {search && <SearchBar searchHandler={searchHandler} setSearch={setSearch}/>}
      {detailPost && <PostDetail post={post} setDetailPost={setDetailPost}/>}

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
      {loading ? <section className="text-center py-10">
        <h2 className="text-2xl font-semibold">Load data...</h2>
      </section> : (
        <section className="w-full py-10 px-7  grid grid-cols-4 gap-x-3">
        {posts?.map((post, idx) => (
          <button onClick={()=>{
            setDetailPost(true);
            setPost(post);
          }} className="w-full cursor-pointer" key={idx}>
            <img src={`http://127.0.0.1:8000/storage/posts_image/${post.image}`} alt={post.title} className="w-full h-[220px] rounded-lg" />
          </button>
        ))}
      </section>
      )}
   </div>
  )
}

export default Home;
