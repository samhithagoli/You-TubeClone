import React from 'react'
import Home from '../pages/Home/Home'

import { Routes,
    Route,
    Link

 } from 'react-router-dom';
 import Library from '../pages/Library/Library';
 import Yourvideo from '../pages/Yourvideo/Yourvideo.jsx'
 import WatchHistory from '../pages/Watchhistory/Watchhistory.jsx'
 import WatchLater from '../pages/Watchlater/Watchlater.jsx'
 import LikedVideo from '../pages/Likedvideo/Likedvideo.jsx'
 import Videopage from "../pages/Videopage/Videopage.jsx"
 import Channel from '../pages/channel/Channel'
 import Search from '../pages/Search/Search.jsx'
function Allroutes({ setEditCreateChannelbtn,setVidUploadPage }) {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/library' element={<Library />}/>
        <Route path='/watchhistory' element={<WatchHistory />}/>
        <Route path="/history" element={<WatchHistory />} />
        <Route path='/watchlater' element={<WatchLater />}/>
        <Route path='/likedvideo' element={<LikedVideo />}/>
        <Route path='/yourvideos' element={<Yourvideo />}/>
        <Route path='/videopage/:vid' element={<Videopage />}/>
        <Route path="/seacrh/:searchQuery" element={<Search />} />
        <Route path='/channel/:Cid' element={

        <Channel
        setVidUploadPage={setVidUploadPage}
        setEditCreateChannelbtn={setEditCreateChannelbtn}
        />}/>
    </Routes>
  )
}

export default Allroutes
