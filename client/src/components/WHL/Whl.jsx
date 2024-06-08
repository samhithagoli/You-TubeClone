import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { clearHistory } from "../../actions/History";

import Leftsidebar from '../leftsidebar/leftsidebar'
import "./whl.css"
import WhlVideolist from './WhlVideolist'
function Whl({page,videoList}) {
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
const dispatch=useDispatch()
  const handleClearHistory=()=>{
    if(CurrentUser){
      dispatch(clearHistory({
        userId:CurrentUser?.result._id
      }))
    }
  }
  return (
    <div className='container_pages_app'>
    <Leftsidebar/>
      <div className='container2_pages_app'>
      <p className='container_whl'>
         <div className='box_WHL leftside_whl'>
            <b>Your {page} Shown Here </b>
            {
              page==="History"&&
              <div className='clear_history_btn' onClick={()=>handleClearHistory()}>
                Clear History
            </div>
            }
            
        </div>
        <div className='rightside_whl'>
            <h1>{page}</h1>
            <div className='whl_list'>
            <WhlVideolist
            page={page}
            CurrentUser={CurrentUser?.result._id}
            videoList={videoList}
            />
            </div>
        </div>
      </p>
      </div>
      </div>
  )
}

export default Whl;
