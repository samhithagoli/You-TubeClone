import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import './ShowVideo.css';

function ShowVideo({vid}) {
  console.log(vid)
  return (
    <>
        <Link to={`/videopage/${vid?._id}`}>
        <video
        //src={`http://localhost:5500/${vid.filePath}`}
        src={`https://you-tubeclone.onrender.com/${vid.filePath}`}
        className='video_showvideo'
        width="270"
        height="200"
        />
    
        
    </Link>
    <div className='video_description'>
        <div className='channel_logo_App'>
          <div  className='fstChar_logo_App'>
            <>{vid?.Uploader?.charAt(0).toUpperCase()}</>
          </div>
        </div>
    <div className='video_details'>
      <p className='title_vid_showvideo'>{vid?.videoTitle}</p>
      <pre className='vid_views_uploadtime'>{vid?.Uploder}</pre>
      <pre className='vid_views_uploadtime'>
      {vid?.Views} views <div className="dot"></div> {moment(vid?.createdAt).fromNow()}
      </pre>
    </div>
    </div>
    </>
    
  )
}

export default ShowVideo