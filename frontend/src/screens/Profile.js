import { useState,useEffect } from "react";
import { Navbar } from "../components";
import { useDispatch,useSelector } from "react-redux";
import { GetProfilePosts,DeleteUserPost, UpdateProfile, UpdateAvatarHandler } from "../slices/ProfileSlice";
import { useNavigate,Link } from "react-router-dom";
import Alert from "../components";


const Profile = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { auth:{ user,token },profile } = useSelector(state=>state);

   const [open,setOpen] = useState(false);
   const [imagePreview,setImagePreview] = useState(null);

   const [profileForm,setProfileForm] = useState({
      username:"",
      display_name:"",
      email:""
   });

   useEffect(() => {
      if(!token) {
         navigate("/");
      }
      if(user) {
         setProfileForm({
            username:profile?.dataProfile?.username,
            display_name:profile?.dataProfile?.display_name,
            email:profile?.dataProfile?.email,
            profile:profile?.dataProfile?.profile 
         });
      }
   },[token,profile]);

   const submitHandler = (e) => {
      e.preventDefault();

      dispatch(UpdateProfile({ profileForm, userid:user.id,dispatch,setOpen }));
   }

   const changeHandler = (e) => setProfileForm({...profileForm,[e.target.name]:e.target.value});

   const avatarHandler = (element) => {
      const file = element.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
         dispatch(UpdateAvatarHandler({ file, userid:user.id }));
      }
      reader.readAsDataURL(file);
   }
    
     return (
        <div className="w-full min-h-screen">
           <Navbar/>
           <section className="flex items-center justify-center w-full py-10 flex-col">
            <input onChange={avatarHandler} type="file" id="avatar" name="avatar" className="hidden"/>
            <label htmlFor="avatar" className="relative">
            {profile?.dataProfile?.profile ? <img className="w-[100px] h-[100px] rounded-full" src={`http://127.0.0.1:8000/storage/profile_image/${profile?.dataProfile?.profile}`}/> : (
                  <span className={`w-[100px] text-white text-3xl font-bold h-[100px] rounded-full bg-pink-500 flex items-center justify-center uppercase`}>
                  {user?.username?.charAt(0)}
                </span>
             )}
            <button className="absolute top-0 right-0 w-[26px] h-[26px] rounded-full bg-gray-100 flex items-center justify-center">
             <i class="ri-image-edit-line"></i>
             </button>
            </label>
             <div className="text-center mt-5">
                <h2 className="text-2xl font-bold">{profile?.dataProfile?.username}</h2>
                <p className="text-gray-500 text-md mt-2">{profile?.dataProfile?.display_name}</p>
                <div className="flex items-center gap-x-3 mt-7">
                    <button onClick={()=>setOpen(true)} className="bg-gray-100 font-medium text-sm py-3 px-3 rounded-md"> Edit Profile </button>
                    <button className="bg-gray-100 font-medium text-sm py-3 px-3 rounded-md">Share</button>
                </div>
             </div>
           </section>
           <section className="mt-10 grid px-7 grid-cols-5 gap-x-3">
            {profile?.posts.map((post,idx) => (
                 <div className="w-full" key={idx}>
                 <img src={`http://127.0.0.1:8000/storage/posts_image/${post.image}`} alt={post.id} className="w-full h-[220px] rounded-lg" />
                 <div className="flex py-3 items-center gap-x-2">
                 <button onClick={()=>dispatch(DeleteUserPost({ postid:post.id }))}><i class="ri-delete-bin-7-line"></i></button>
                 <Link to={`/update-post/${post.id}`}>
                 <button><i class="ri-edit-line"></i></button>
                 </Link>
                 </div>
               </div>
            ))}
           </section>
           {open ? <section onClick={(e) => {
            if(e.target.className.includes("fixed")) {
               setOpen(false);
            }
           }} className="w-full flex items-center justify-center min-h-screen fixed top-0 left-0 z-[999]" style={{backgroundColor:'rgba(10,10,10,0.4)'}}>
              <div className="bg-white w-[30vw] rounded-md py-5 px-5">
               <h2 className="text-center font-bold text-xl">Update Profile</h2>
               <form onSubmit={submitHandler} className="mt-7 flex flex-col gap-y-4">
                  <div className="flex flex-col gap-y-1">
                     <label>Username</label>
                     <input onChange={changeHandler} value={profileForm?.username} type="text" name='username' className="w-full bg-gray-100 py-2 px-3 rounded-md outline-none"/>
                  </div>
                  <div className="flex flex-col gap-y-1">
                     <label>Display Name</label>
                     <input onChange={changeHandler} value={profileForm?.display_name} type="text" name='display_name' className="w-full bg-gray-100 py-2 px-3 rounded-md outline-none"/>
                  </div>
                  <div className="flex flex-col gap-y-1">
                     <label>Email</label>
                     <input onChange={changeHandler} value={profileForm?.email} type="email" name='email' className="w-full bg-gray-100 py-2 px-3 rounded-md outline-none"/>
                  </div>
                  <button className="bg-pink-500 py-2 text-[15px] font-semibold outline-none w-full rounded-full mt-3 text-white">Update</button>
               </form>
              </div>
           </section>:null}
        </div>
     )
}

export default Profile;