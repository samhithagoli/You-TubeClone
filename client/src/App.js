
import './App.css';
import Navbar from "./components/navbar/navbar";
import React from 'react';
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, 
  Routes,
  Route,
Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchAllChanel } from "./actions/channelUser";
import Allroutes from './components/Allroutes';
import Drawersidebar from './components/leftsidebar/drawersidebar'
import CreateEditChannel from './pages/channel/CreateEditChannel';
import VideoUpload from './pages/VideoUpload/VideoUpload';
import { getAllVideo } from './actions/video';
import { getAlllikedVideo } from "./actions/likedVideo";
import { getAllwatchLater } from "./actions/watchLater";
import { getAllHistory } from "./actions/History";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllChanel());
    dispatch(getAllVideo);
    dispatch(getAlllikedVideo());
    dispatch(getAllwatchLater());
    dispatch(getAllHistory());
  },[dispatch])
  const [toggleDraweSidebar, setToggleDraweSidebar] = useState({
    display:"none",
  })
  const toggleDrawer=()=>{
    if(toggleDraweSidebar.display==="none"){
      setToggleDraweSidebar({
        display:"flex"
      })
    }
    else{
      setToggleDraweSidebar({
        display:"none"
      })
    }
  }
  const [vidUploadPage, setVidUploadPage] = useState(false);
  const [EditCreateChannelbtn,setEditCreateChannelbtn]=useState(false)
  return (
    <Router>
   {vidUploadPage && <VideoUpload  setVidUploadPage={setVidUploadPage}/>}
    {
      EditCreateChannelbtn&&<CreateEditChannel setEditCreateChannelbtn={setEditCreateChannelbtn}/> 
    }
    
      <Navbar
      setEditCreateChannelbtn={setEditCreateChannelbtn}
         toggleDrawer={toggleDrawer}
      />
      {
        <Drawersidebar
          toggleDrawer={toggleDrawer}
          toggleDraweSidebar={toggleDraweSidebar}
        />
      }
      <Allroutes setVidUploadPage={setVidUploadPage} setEditCreateChannelbtn={setEditCreateChannelbtn}/>
    </Router>
  );
}

export default App;
