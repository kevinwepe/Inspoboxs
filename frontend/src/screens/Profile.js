import { useState,useEffect } from "react";
import { Navbar } from "../components";
import { useDispatch,useSelector } from "react-redux";
import { GetProfilePosts } from "../slices/ProfileSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { auth:{ user,token },profile } = useSelector(state=>state);

   useEffect(() => {
      if(!token) {
         navigate("/");
      }
      
     dispatch(GetProfilePosts({ userid:user.id }));

     console.log("test");
   },[token]);
   
     return (
        <div className="w-full min-h-screen">
           <Navbar/>
           <section className="flex items-center justify-center w-full py-10 flex-col">
             {user?.profile ? null : (
                  <span className={`w-[100px] text-white text-3xl font-bold h-[100px] rounded-full bg-pink-500 flex items-center justify-center uppercase`}>
                  {user?.username?.charAt(0)}
                </span>
             )}
             <div className="text-center mt-5">
                <h2 className="text-2xl font-bold">{user?.username}</h2>
                <p className="text-gray-500 text-md mt-2">{user?.display_name}</p>
                <div className="flex items-center gap-x-3 mt-7">
                    <button className="bg-gray-100 font-medium text-sm py-3 px-3 rounded-md"> Edit Profile </button>
                    <button className="bg-gray-100 font-medium text-sm py-3 px-3 rounded-md">Share</button>
                </div>
             </div>
           </section>
           <section className="mt-10 grid px-7 grid-cols-5 gap-x-3">
            {profile?.posts.map((post,idx) => (
                 <div className="w-full" key={idx}>
                 <img src={`http://127.0.0.1:8000/storage/posts_image/${post.image}`} alt={post.title} className="w-full h-[220px] rounded-lg" />
               </div>
            ))}
           </section>
        </div>
     )
}

export default Profile;