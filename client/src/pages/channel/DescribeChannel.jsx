import React from 'react'
import { FaEdit, FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./DescribeChannel.css";
import { useParams } from 'react-router-dom';
function DescribeChannel({setEditCreateChannelbtn,Cid,setVidUploadPage}) {
  const chanels = useSelector((state) => state?.channelReducers);

  const currentChanel = chanels.filter((c) => c._id === Cid)[0];

  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  return (
    <div className='container3_channel'>
   <div className='channel_logo_channel'>
    <b>{currentChanel?.name.charAt(0).toUpperCase()}</b>
   </div>
   <div className="description_chanel">
   <b> {currentChanel?.name} </b>
        <p> {currentChanel?.desc} </p>
   </div>
   {CurrentUser?.result._id === currentChanel?._id && (
        <>
          <p
            className="editbtn_chanel"
            onClick={() => {
              setEditCreateChannelbtn(true);
            }}
          >
            <FaEdit />
            <b> Edit Chanel</b>
          </p>
          <p className="uploadbtn_chanel" onClick={()=>setVidUploadPage(true)}>
            <FaUpload />
            <b> Upload Video</b>
          </p>
        </>
      )}
   </div>
  )
}

export default DescribeChannel