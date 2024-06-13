import React, { useEffect,useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useParams,useNavigate  } from "react-router-dom";
import './videopage.css';
import Likewatchlatersavebtns from './Likewatchlatersavebtns.jsx';
import Comments from '../../components/Comments/Comments.jsx';
import { addToHistory } from "../../actions/History.js";
import { viewVideo } from "../../actions/video.js";
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer.js'

function Videopage() {
  const { vid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  const vids = useSelector((state) => state.videoReducer || { data: [] });

  const vv = vids.data?.find((q) => q._id === vid) || null;
  const commentsRef = useRef(null);
  useEffect(() => {
    if (CurrentUser) {
      dispatch(addToHistory({ videoId: vid, Viewer: CurrentUser?.result._id }));
    }
    dispatch(viewVideo({ id: vid }));
  }, [CurrentUser, dispatch, vid]);

  
  return (
    <>
      <div className='container_videopage'>
        <div className='container2_videopage'>
          <div className='video_display_screen_videopage'>
            {vv && (
              <VideoPlayer 
                videoSrc={`https://you-tubeclone.onrender.com/${vv?.filePath}`}
                className='video_showvideo_videopage'
                
                width="300"
                height="200"
               
              />
            )}
            <div className='video_details_videpage'>
              <div className="video_btns_title_videoapge_cont">
                <p className='video_title_videopage'>{vv?.videoTitle}</p>
                <div className='views_date_btns_videopage'>
                  <div className='views_videopage'>
                    {vv?.Views} views <div className="dot"></div>{" "}
                    {moment(vv?.createdAt).fromNow()}
                    <div className="dot"></div>
                  </div>
                  <Likewatchlatersavebtns vv={vv} vid={vid} />
                </div>
              </div>
              <Link
                to={`/chanel/${vv?.videoChanel}`}
                className="chanel_details_videopage"
              >
                <b className="chanel_logo_videopage">
                  <p>{vv?.Uploder.charAt(0).toUpperCase()}</p>
                </b>
                <p className="chanel_name_videopage">{vv?.Uploder}</p>
              </Link>
              <div className='comments_videopage'>
                <h2>
                  <u>Comments</u>
                </h2>
                <Comments videoId={vv?._id} />
              </div>
            </div>
          </div>
          <div className='morevideobar'>More Videos</div>
        </div>
      </div>
    </>
  );
}

export default Videopage;

