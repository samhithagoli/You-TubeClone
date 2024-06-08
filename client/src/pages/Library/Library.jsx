
import React from "react";
import { useSelector } from "react-redux";
import './Library.css';
import Leftsidebar from "../../components/leftsidebar/leftsidebar";

import {FaHistory} from "react-icons/fa";
import Whlvideolist from '../../components/WHL/WhlVideolist';
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
export default function Library() {
  const CurrentUser = useSelector((state) => state?.currentUserReducer);

  const historyList = useSelector((state) => state.HistoryReducer);
  const likedVideoList = useSelector((state) => state.likedVideoReducer);
  const watchLaterList = useSelector((state) => state.watchLaterReducer);
  return (
    <div className='container_pages_app'>
    <Leftsidebar/>
      <div className='container2_pages_app'>
          <div className="container_librarypage">
            
              <h1 className="title_container_librarypage">
                <b>
                  <FaHistory></FaHistory>

                </b>
                <b>History</b>
              </h1>
              <div className="container_videolist_librarypage">
                <Whlvideolist
                  page={"history"}
                  CurrentUser={CurrentUser?.result._id}
              videoList={historyList}
                />
              </div>
           
          </div>
          <div className="container_librarypage">
            
              <h1 className="title_container_librarypage">
                <b>
                  <MdOutlineWatchLater/>

                </b>
                <b>Watch Later</b>
              </h1>
              <div className="container_videolist_librarypage">
                <Whlvideolist
                  page={"watch later"}
                  CurrentUser={CurrentUser?.result._id}
              videoList={watchLaterList}
                />
              </div>
           
          </div>
          <div className="container_librarypage">
            
              <h1 className="title_container_librarypage">
                <b>
                  <AiOutlineLike/>

                </b>
                <b>Liked Videos</b>
              </h1>
              <div className="container_videolist_librarypage">
                <Whlvideolist
                  page={"liked videos"}
                  CurrentUser={CurrentUser?.result._id}
              videoList={likedVideoList}
                />
              </div>
           
          </div>
      </div>
    </div>
  )
}

