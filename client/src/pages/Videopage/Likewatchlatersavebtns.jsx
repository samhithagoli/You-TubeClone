import React, { useState } from 'react';
import {BsThreeDots} from "react-icons/bs"
import { MdPlaylistAddCheck } from 'react-icons/md'
import {RiHeartAddFill, RiPlayListAddFill, RiShareForwardLine} from 'react-icons/ri'  
import './Likewatchlatersavebtns.css'
import { AiFillDislike, AiOutlineDislike ,AiFillLike,AiOutlineLike} from 'react-icons/ai';

import { useDispatch, useSelector } from "react-redux";
import { likeVideo } from "../../actions/video";
import { addTolikedVideo, deletelikedVideo } from "../../actions/likedVideo";
import { useEffect } from "react";
import { addTowatchLater, deleteWatchLater } from "../../actions/watchLater";

function Likewatchlatersavebtns({vv,vid}) {
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const dispatch = useDispatch();
  const [saveVideo, setSaveVideo] = useState(true);
  const [DislikeBtn, setDislikeBtn] = useState(false);
  const [LikeBtn, setLikeBtn] = useState(false);

  const likedVideoList = useSelector((state) => state.likedVideoReducer);
  
  const watchLaterList= useSelector(state=>state.watchLaterReducer)

  useEffect(() => {
    likedVideoList?.data
      .filter(
        (q) => q?.videoId === vid && q?.Viewer === CurrentUser?.result._id
      )
      .map((m) => setLikeBtn(true));
    watchLaterList?.data
      .filter(
        (q) => q?.videoId === vid && q?.Viewer === CurrentUser?.result._id
      )
      .map((m) => setSaveVideo(true));
  }, []);

  const toggleSavedVideo = () => {
    if (CurrentUser) {
      if (saveVideo) {
        setSaveVideo(false);
        dispatch(
          deleteWatchLater({
            videoId: vid,
            Viewer: CurrentUser?.result._id,
          })
        );
      } else {
        setSaveVideo(true);
        dispatch(
          addTowatchLater({
            videoId: vid,
            Viewer: CurrentUser?.result._id,
          })
        );
      }
    } else {
      alert("Please Login To save the video !");
    }
  };
  
  const toggleLikeBtn = (e, lk) => {
    if (CurrentUser) {
      if (LikeBtn) {
        setLikeBtn(false);
        dispatch(
          likeVideo({
            id: vid,
            Like: lk - 1,
          })
        );
        dispatch(deletelikedVideo({
          videoId: vid,
          Viewer: CurrentUser?.result._id,
        }))
      } else {
        setLikeBtn(true);
        dispatch(
          likeVideo({
            id: vid,
            Like: lk + 1,
          })
        );
        dispatch(
          addTolikedVideo({
            videoId: vid,
            Viewer: CurrentUser?.result._id,
          })
        );
        setDislikeBtn(false);
      }
    } else {
      alert("Please Login To give a like");
    }
  };

  const toggleDislikeBtn = (e, lk) => {
    if (CurrentUser) {
      if (DislikeBtn) {
        setDislikeBtn(false);
      } else {
        setDislikeBtn(true);
        if (LikeBtn) {
          dispatch(
            likeVideo({
              id: vid,
              Like: lk - 1,
            })
          );
          dispatch(deletelikedVideo({
            videoId: vid,
            Viewer: CurrentUser?.result._id,
          }))
        }
        setLikeBtn(false);
      }
    } else {
      alert("Please Login To give a like");
    }
  };
  return (
    <div className='btn_cont_videopage'>
    <div className='btn_videopage'>
      <BsThreeDots/>
    </div>
    <div className='btn_videopage'>
       <div className='like_videopage' onClick={(e)=>toggleLikeBtn(e, vv?.Like)} >
       {LikeBtn ? (
            <>
              <AiFillLike size={22} className='btns_videopage' />
              
            </>
          ) : (
            <>
              <AiOutlineLike size={22} className='btns_videopage' />
              
            </>
          )}
          <b>{vv && vv.Like}</b>
       </div>
       <div className='like_videopage' onClick={(e)=>toggleDislikeBtn(e,vv.like)}>
       {DislikeBtn ? (
            <>
              <AiFillDislike size={22} className='btns_videopage' />
              
            </>
          ) : (
            <>
              <AiOutlineDislike size={22} className='btns_videopage' />
              
            </>
          )}
          <b>DISLIKE</b>
       </div>
       <div className="like_videoPage" onClick={() => toggleSavedVideo()}>
          {saveVideo ? (
            <>
              <MdPlaylistAddCheck size={22} className="btns_videopage" />
              <b>Saved</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className="btns_videopage" />
              <b>Save</b>
            </>
          )}
        </div>
       <div className='like_videopage' >
       
            <>
              <RiHeartAddFill size={22} className='btns_videopage' />
              <b>Thanks</b>
            </>
       </div>
       <div className='like_videopage' >
       
            <>
              <RiShareForwardLine size={22} className='btns_videopage' />
              <b>Share</b>
            </>
       </div>
       
    </div>
    </div>
  )
}

export default Likewatchlatersavebtns;