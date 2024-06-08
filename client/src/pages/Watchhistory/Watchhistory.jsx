import React from 'react'
import { useSelector } from 'react-redux';

import Whl from '../../components/WHL/Whl'

function Watchhistory() {
  const historyList= useSelector(state=>state.HistoryReducer)
  return (
    <Whl page={"History"} videoList={historyList}/>
  )
}

export default Watchhistory