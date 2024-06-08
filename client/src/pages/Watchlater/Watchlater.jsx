import React from 'react'
import { useSelector } from 'react-redux';

import Whl from '../../components/WHL/Whl'
function Watchlater() {
  
  const watchLaterList= useSelector(state=>state.watchLaterReducer)
  console.log(watchLaterList)
  return (
    <Whl page={"watchlater"} videoList={watchLaterList}/>
  )
}

export default Watchlater