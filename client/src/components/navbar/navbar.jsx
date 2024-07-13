import React,{useEffect,useState} from 'react'
import  './navbar.css'
import logo from  './utube.ico';
import  SearchBar from "./searchbar/searchbar";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import {BiUserCircle } from "react-icons/bi";
import {Link} from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import {gapi} from "gapi-script";
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../../actions/auth';
import axios from 'axios'
import Auth from '../../pages/Auth/Auth'
import { MdOutlineMissedVideoCall } from "react-icons/md";
import { Redirect, Route } from 'react-router-dom';

function Navbar({toggleDrawer,setEditCreateChannelbtn}) {

  const [AuthBtn, setAuthBtn] = useState(false);

  const currentTime = new Date().getHours();

  const isVisible = currentTime >= 18 && currentTime < 24;

  //const CurrentUser=null;
  // const CurrentUser={
  //   result:{
  //   email: "xyz@mail.com",
  //   joinedOn: "2222-02-15T09:57:23.4892",
  //   }
  // };
  const CurrentUser=useSelector(state=>state.currentUserReducer);
  console.log(CurrentUser);
  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId: "969163187700-42c668mlofk3uaumb1b9m9r2gvb74ml2.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2",start);
  },
[]);
const dispatch= useDispatch();
  const clientId = "969163187700-42c668mlofk3uaumb1b9m9r2gvb74ml2.apps.googleusercontent.com";
  const onSucess=(response)=>{
    const Email=response?.profileObj.email;
    console.log( Email);
    dispatch(login({email: Email}));
  }
  const  onFailure=(response)=>{
    console.log( "failed",response );
  }
  const handleLogin = async (googleData) => {
    try {
        const res = await axios.post('http://localhost:5500/user/google-signin', {
            token: googleData.tokenId,
        });

        console.log(res.data);
    } catch (error) {
        console.error('Error logging in with Google', error);
    }
};


  return (
    <>
    <div className='container_navbar'>
      <div className="burger_logo_navbar">
       <div className='burger' onClick={()=>toggleDrawer()}>
        <p></p>
        <p></p>
        <p></p>
       </div>
      <Link to={'/'} className='logo_ div_navbar'>
       <img className="image" src={logo} alt=""/>
        

      </Link>
      
      
      </div>
      <SearchBar/>
      <RiVideoAddLine size={22} className={"vid_bell_Navbar"}/>
      {( <Link to={'/createroom'} className={"vid_bell_Navbar"}>
        <MdOutlineMissedVideoCall size={27}  />
      </Link>
        
        )}
      <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"}/>
      <div className='Auth_cont_Navbar'>
      {CurrentUser ? (
        <>
          <div className='channel_logo_App' onClick={()=>setAuthBtn(true )}>
            <p className='fstChar_logo_App'>
              {
                CurrentUser?.result.name?(
                  <>
                    {CurrentUser?.result.name.charAt(0).toUpperCase()} 
                  </>
                ):(<>
                  {CurrentUser?.result.email.charAt(0).toUpperCase()}
                </>)
              }
            </p>
          </div>
        </>
      ):(
        <>
        <GoogleLogin
          clientId= {"969163187700-42c668mlofk3uaumb1b9m9r2gvb74ml2.apps.googleusercontent.com"}
          onSuccess={onSucess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          render={(renderProps)=>(
            <p onClick={renderProps.onClick} className='Auth_Btn'>
            <BiUserCircle  size={22}/>
            <b>sign in</b>
          </p>)
          }
        />
          
        </>
      )}
          
      </div>
      {
        AuthBtn &&
      <Auth
      setEditCreateChannelbtn={setEditCreateChannelbtn}
      setAuthBtn={setAuthBtn}
        User={CurrentUser}
      />
    }
    </div>
    
   </>
  )
}

export default Navbar
