import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { BiLogOut } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { setCurrentUser } from '../../actions/currentUser'
import './Auth.css'
function Auth({User,setAuthBtn,setEditCreateChannelbtn}) {
    const dispatch= useDispatch()
   const onLogoutSuccess=()=>{
     dispatch(setCurrentUser(null));
     alert("Log Out SuccessFully");
   }

  return (
    <div className='Auth_container' onClick={()=>setAuthBtn(false)}>
        <div className='Auth_container2'>
            <p className='User_details'>
                <div className='channel_logo_App'>
                    <p className='fstChar_logo_App'>
                    {
                        User?.result.name ? (
                            <>{User?.result.name.charAt(0).toUpperCase()}</>
                        ):(
                            <>{User?.result.email.charAt(0).toUpperCase()}</>
                        )
                    }
                    </p>
                </div>
                <div className='email_Auth'>{ User?.result.email} </div>
            </p>
            <div className='btn_Auth'>
            {
                User?.result.name ?<>
                    {
                        
                <Link to={`/channel/${User?.result._id}`} className="btn_Auth">
                  Your Chanel
                </Link>
              
                    }

                </>
                :
                    <>
                <input type='submit' className='btn_Auth' value="create your channel"
                    onClick={()=>setEditCreateChannelbtn(true)}
                />
                </>
            }
               
            </div>
            
                <GoogleLogout
                    clientId= {"969163187700-42c668mlofk3uaumb1b9m9r2gvb74ml2.apps.googleusercontent.com"}
                    onLogoutSuccess={onLogoutSuccess}
                    render={(renderProps)=>(
                        <div onClick={renderProps.onClick} className='btn_Auth'>
                            <BiLogOut/>
                            Log Out
                        </div>
                    )}
                />
                <div>
            </div>
        </div>
    </div>
  );
}

export default Auth;