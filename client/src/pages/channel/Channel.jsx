import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Leftsidebar from "../../components/leftsidebar/leftsidebar";
import ShowVideogrid from '../../components/ShowVideogrid/ShowVideogrid';

import DescribeChannel from './DescribeChannel';


function Channel({setEditCreateChannelbtn,setVidUploadPage}) {
  const {Cid}=useParams();
  const vids=useSelector(state=>state.videoReducer)?.data?.filter(q=>q?.videoChanel === Cid).reverse();
       
    
  return (
    <div className='container_pages_app'>
    <Leftsidebar/>
      <div className='container2_pages_app'>
      <DescribeChannel
       Cid={Cid}
       setVidUploadPage={setVidUploadPage}
        setEditCreateChannelbtn={setEditCreateChannelbtn}
      />
      <ShowVideogrid vids={vids}/>
      </div>
    </div>
  )
}

export default Channel