import React from 'react'
import ShowVideo from '../ShowVideo/ShowVideo';  // Correct relative path
import { useSelector } from 'react-redux';



function ShowVideoList({videoId}) {
  const vids=useSelector(s=>s.videoReducer)
  console.log(vids.data)
  return (
    <div className='container_showvideogrid'>
        {
            vids?.data?.filter(q=>q._id===videoId).map(vi=>
            {
                return (
                    <div key={vi._id} className='video_box_app'>
                        <ShowVideo vid={vi}/>
                    </div>
                )
            }
            )
        }
    </div>
  )
}

export default ShowVideoList