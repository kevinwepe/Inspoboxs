import { Routes,Route } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import {
  Home ,
  Upload,
  Profile,
  UpdatePost
} from './screens';
import { useEffect } from "react";
import { getAllPosts } from "./slices/PostSlice";
import { closeAlert } from "./slices/AlertSlice";
import { GetProfilePosts } from "./slices/ProfileSlice";

function App() {
  const dispatch = useDispatch();
  const { auth,alert } = useSelector(state=>state);

  useEffect(() => {

    if(auth.token) {
       dispatch(GetProfilePosts({ userid:auth.user.id }));
    }
 
    dispatch(getAllPosts());

    setTimeout(() => {
      dispatch(closeAlert());
    },3000)

  } ,[auth,alert]);

  return (
   <div className="w-full">
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/create" element={<Upload/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/update-post/:id" element={<UpdatePost/>}/>
      </Routes>
   </div>
  )
}

export default App;
