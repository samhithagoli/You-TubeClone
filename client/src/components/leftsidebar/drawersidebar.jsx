import React from 'react'
import './leftsidebar.css';
import { AiFillLike, AiFillPlaySquare, AiOutlineHome } from 'react-icons/ai';
import {MdOutlineExplore, MdOutlineVideoLibrary, MdOutlineWatchLater, MdSubscriptions} from "react-icons/md";
import Shorts from "./shorts.png";
import { FaHistory } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
function drawersidebar({toggleDrawer,toggleDraweSidebar}) {
    return (
        <div className="container_DrawaerLeftSidebar" style={toggleDraweSidebar}>
          <div className="container2_DrawaerLeftSidebar">
            <div className="Drawer_leftsidebar">
              <NavLink to={'/'} className="icon_sidebar_div">
                <p>
                  <AiOutlineHome
                    size={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">Home</div>
                </p>
              </NavLink>
              <div className="icon_sidebar_div">
                <p>
                  <MdOutlineExplore
                    size={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">Explore</div>
                </p>
              </div>
              <div className="icon_sidebar_div">
                <p>
                  <img
                    src={Shorts}
                    width={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">Shorts</div>
                </p>
              </div>
              <div className="icon_sidebar_div">
                <p>
                  <MdSubscriptions
                    size={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">Subscriptions</div>
                </p>
              </div>
            </div>
            <div className="libraryBtn_Drawerleftsidebar">
              <NavLink to={'/library'} className="icon_sidebar_div">
                <p>
                  <MdOutlineVideoLibrary
                    size={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">Library</div>
                </p>
              </NavLink>
              <NavLink to={'/history'} className="icon_sidebar_div">
                <p>
                  <FaHistory
                    size={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">History</div>
                </p>
              </NavLink>
              <NavLink to={'/yourvideos'} className="icon_sidebar_div">
                <p>
                  <AiFillPlaySquare
                    size={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">Your Videos</div>
                </p>
              </NavLink>
              <NavLink to={'/watchlater'} className="icon_sidebar_div">
                <p>
                  <MdOutlineWatchLater
                    size={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">Watch Later</div>
                </p>
              </NavLink>
              <NavLink to={'/likedvideo'} className="icon_sidebar_div">
                <p>
                  <AiFillLike
                    size={22}
                    className={"icon_sidebar"}
                    style={{ margin: "auto 0.7rem" }}
                  />
                  <div className="text_sidebar_icon">Liked Videos</div>
                </p>
              </NavLink>
            </div>
          </div>
          <div
            className="container3_DrawaerLeftSidebar"
            onClick={() => toggleDrawer()}
          ></div>
        </div>
      );
}

export default drawersidebar