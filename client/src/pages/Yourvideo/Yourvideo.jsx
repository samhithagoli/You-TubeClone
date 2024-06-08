import React from 'react'
import { useSelector } from "react-redux";
import Leftsidebar from "../../components/leftsidebar/leftsidebar";
import ShowVideogrid from '../../components/ShowVideogrid/ShowVideogrid';

import './yourvideo.css'
function Yourvideo() {
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const vids=useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.videoChanel === CurrentUser?.result?._id).reverse();
  return (
    <div className='container_pages_app'>
    <Leftsidebar/>
      <div className='container2_pages_app'>
      <div className='container_yourvideo'>
          <h1>Your Videos</h1>
          {
            CurrentUser ?(<>
          <ShowVideogrid vids={vids} />
            </>):<>
            <h3>Please Login to see Your uploded video list</h3></>
          }
         
          </div>
      </div>
    </div>
  )
}

export default Yourvideo