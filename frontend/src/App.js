import { Routes,Route } from "react-router-dom";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";

import {
  Home ,
  Upload,
  Profile
} from './screens';
import { useEffect } from "react";
import { getAllPosts } from "./slices/PostSlice";
import { closeAlert } from "./slices/AlertSlice";

function App() {
  const dispatch = useDispatch();
  const { auth,alert } = useSelector(state=>state);

  useEffect(() => {
 
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
      </Routes>
   </div>
  )
}

export default App;
