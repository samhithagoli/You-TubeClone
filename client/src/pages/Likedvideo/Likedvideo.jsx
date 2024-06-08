import React from 'react'
import { useSelector } from 'react-redux';

import Whl from '../../components/WHL/Whl'
function Likedvideo() {
  const likedVideoList= useSelector(state=>state.likedVideoReducer)
  return (
    <Whl page={"Liked video"} videoList={likedVideoList}/>
  )
}

export default Likedvideo