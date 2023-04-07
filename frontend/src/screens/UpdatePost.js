import { Navbar } from "../components";
import { useSelector,useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UpdatePostItem } from "../slices/ProfileSlice";

const UpdatePost = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { auth:{ user , token }, posts , profile } = useSelector(state=>state); 

    const [imagePreview,setImagePreview] = useState(null);
    const [postForm,setPostForm] = useState({
            title:"",
            image:"",
            description:"",
            user_id:user?.id 
        });
    
    const changeHandler = (e) => {
        e.preventDefault();
        setPostForm({...postForm, [e.target.name]:e.target.value});
    }

    const imageHandler = (element) => {
        const file = element.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
            setPostForm({...postForm, image:file});
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const submitHandler = (e) => {
        e.preventDefault();
      
        dispatch(UpdatePostItem({ postForm, id,dispatch,setPostForm }));
    }

    const cancelPost = () => {
        postForm.delete('title');
        postForm.delete('description');
        postForm.delete('image');
        setImagePreview(null);
    }

    useEffect(() => {
          axios.get(`http://127.0.0.1:8000/api/posts/post/${id}`)
          .then(res=> {
            const { data } = res;
            setPostForm({
                title:data.title,
                description:data.description
            });

            setImagePreview(`http://127.0.0.1:8000/storage/posts_image/${data.image}`);
          })
          .catch(err=>console.log(err));
    }, [id])

    return (
        <div className="w-full min-h-screen bg-white">
          <Navbar/>
          <div className="w-[50vw] py-5 mt-10 px-5 mx-auto bg-white rounded-lg flex justify-between items-start">
                <input onChange={imageHandler} type="file" className="hidden" id="image" name="image"/>
                <label htmlFor="image" className="bg-gray-100 rounded-lg w-[48%] h-[330px] flex py-2 px-2 justify-center items-center">
               {imagePreview ? <img src={imagePreview} alt="preview" className="w-full rounded-lg h-full"/> :  <i className="ri-image-add-line text-5xl text-gray-500"></i>}
                </label>
                <form onSubmit={submitHandler} className="w-[48%]">
                    <div className="flex items-start gap-x-3">
                    <span className={`w-[46px] text-white font-bold h-[46px] rounded-full bg-pink-500 flex items-center justify-center uppercase`}>
                    {user?.username?.charAt(0)}
                   </span>
                   <div className="flex flex-col">
                    <h5 className="text-[15px] font-bold">{user?.display_name}</h5>
                    <p className="text-[12px] font-medium text-gray-500">{user?.username}</p>
                   </div>
                    </div>
                    <div className="flex mt-5 flex-col gap-y-2">
                        <label className="font-semibold text-[15px]">Title</label>
                        <input onChange={changeHandler} value={postForm.title} name='title' type="text" className="w-full bg-gray-100 rounded-md outline-none py-2 px-3"/>
                    </div>
                    <div className="flex mt-3 flex-col gap-y-2">
                        <label className="font-semibold text-[15px]">Description</label>
                        <textarea onChange={changeHandler} value={postForm.description} name='description' type="text" className="w-full bg-gray-100 rounded-md outline-none py-2 px-3">
                            {postForm.description}
                        </textarea>
                    </div>
                    <div className="flex justify-end items-center text-white mt-10 gap-x-3">
                        <button type="submit" className="bg-pink-500 text-[15px] font-semibold py-1 px-3 rounded-md">Update</button>
                        <button type="button" onClick={cancelPost} className="text-pink-500 border border-pink-500 text-[15px] font-semibold py-1 px-3 rounded-md">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePost;