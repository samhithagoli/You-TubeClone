import React from 'react'
import ShowVideo from '../ShowVideo/ShowVideo';  // Correct relative path

import './showVideogrid.css';
function ShowVideogrid({vids}) {
  return (
    <div className='container_showvideogrid'>
        {
            vids?.reverse().map(vi=>
            {
                return (
                    <div key={vi._id} className="video_box_app">
                        <ShowVideo vid={vi}/>
                    </div>
                )
            })  
        }
    </div>
  )
}

export default ShowVideogrid