import { useState } from "react"
import { useSelector,useDispatch } from 'react-redux';
import { CommentHandler } from "../slices/PostSlice";

const PostDetail = ({ post,setDetailPost }) => {
  const dispatch = useDispatch();
  const { auth:{ user}, posts } = useSelector(state=>state);
  const [commentTerm,setCommentTerm] = useState("");

  const commentHandler = (e) => {
     dispatch(CommentHandler({ comment:commentTerm, userid:user.id,postid:post.id }));
  }

  return (
    <div onClick={(e)=>{
      if(e.target.className.includes("fixed")) {
         setDetailPost(false);
      }
    }} className='z-[999] w-full min-h-screen fixed top-0 left-0 flex items-center justify-center' style={{backgroundColor:`rgba(10,10,10,0.5)`}}>
         <div className='bg-white pt-5 pl-5 rounded-lg w-[50vw] overflow-hidden flex items-start'>
           <img src={`http://127.0.0.1:8000/storage/posts_image/${post.image}`} className='w-[45%] rounded-t-lg h-[420px]'/>
           <div className='w-[55%] pb-5 px-5'>
             <div className='flex items-center justify-between'>
               <div className='flex items-start gap-x-4'>
               {post.user.image ?   <img src={`http://127.0.0.1:8000/storage/profile_image/${post?.user?.image}`}/> : (
                  <span className={`w-[46px] text-white font-bold h-[46px] rounded-full bg-pink-500 flex items-center justify-center uppercase`}>
                  {post?.user?.username?.charAt(0)}
                </span>
               )}
               <div className='flex flex-col'>
                <h5 className='font-bold text-md'>{post?.user?.username}</h5>
                <p className='text-sm text-gray-500'>{post?.user?.display_name}</p>
               </div>
               </div>
               <button className='text-sm font-semibold text-white bg-pink-500 rounded-full py-2 px-4'>Follow</button>
             </div>
             <h4 className='text-xl font-bold mt-3'>{post?.title}</h4>
             <div className='flex items-center gap-x-2 mt-5'>
              <h5 className='text-md font-semibold'>{post.comments.length} comments</h5>
              <i className="ri-arrow-down-s-line text-xl"></i>
             </div>
             <div className='w-full mt-1 flex flex-col gap-y-3 h-[220px] overflow-y-scroll'>
              {posts.loadingComment ? <div className="text-center">loading</div> : post.comments.map((comment,idx) => (
                <div className="w-full" key={idx}>
                  <div className="flex items-center gap-x-3">
                    {comment?.user?.profile ? (
                       <img src={`http://127.0.0.1:8000/storage/profile_image/${comment.user.profile}`} className="w-[46px] h-[46px] rounded-full" />

                    ) : (
                      <span className={`w-[40px] text-white font-bold h-[40px] rounded-full bg-pink-500 flex items-center justify-center uppercase`}>
                      {comment?.user?.username?.charAt(0)}
                    </span>
                    )} 
                    <div className="flex items-center gap-x-2">
                      <h5 className="font-semibold text-sm">{comment.user.username}</h5>
                      <h5 className="font-normal  text-gray-500 text-sm">{comment.comment}</h5>

                    </div>
                  </div>
                </div>
              ))}
             </div>
             <div className='flex items-center gap-x-3 w-full'>
             <span className={`w-[40px] text-white font-bold h-[40px] rounded-full bg-pink-500 flex items-center justify-center uppercase`}>
                  {post?.user?.username?.charAt(0)}
                </span>
                <div className='relative flex-1'>
                  <input onChange={(e)=>setCommentTerm(e.target.value)} type="text" className='w-full outline-none bg-gray-100 rounded-md py-2 px-3'/>
                {commentTerm.length > 0 && (
                    <button onClick={commentHandler} className='cursor-pointer w-[30px] h-[30px] rounded-full text-center bg-pink-500 text-white absolute top-1 right-0'>
                    <i class="ri-send-plane-2-fill"></i>
                    </button>
                )}
                </div>
             </div>
           </div>
         </div>
    </div>
  )
}

export default PostDetail