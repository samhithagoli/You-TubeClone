import React from 'react'
import {useState} from "react"
import './CreateEditChannel.css'
import { useDispatch,useSelector } from 'react-redux';
import {login} from '../../actions/auth'
import { updateChannelData } from '../../api';

function CreateEditChannel({setEditCreateChannelbtn}) {
    // const CurrentUser={
    //     result:{
    //     email: "xyz@mail.com",
    //     joinedOn: "2222-02-15T09:57:23.4892",
    //     }
    //   };
    const CurrentUser=useSelector(state=>state.currentUserReducer);

  const [name, setName] = useState(CurrentUser?.result.name);
  const [desc,setDesc]= useState(CurrentUser?.result.desc);

const dispatch=useDispatch();
  const handleSubmit=()=>{
   if(!name){
    alert("Plz enter name!");
   }
   else if(!desc){
    alert("plz enter description !");
   }
   else{
    dispatch(updateChannelData(CurrentUser?.result._id,{
      name: name,
      desc: desc,
    }));
    setEditCreateChannelbtn(false);
    setTimeout(()=>{
      dispatch(login({email:CurrentUser?.result.email}));
    },5000);
   }
  }
  return (
    <div className='container_CreateEditChannel'>
    <input
    
    type='submit'
    name='text'
    value={"X"}
    className='ibtn_x'
    onClick={()=>setEditCreateChannelbtn(false)}
    />
    <div className='container2_CreateEditChannel'>
    <h1>
          {CurrentUser?.result.name ? <>Edit</> : <>Create </>}
          Your Chanel
        </h1>
        <input
          type="text"
          placeholder="Enter Your/Chanel Name"
          className="ibox"
          name="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          type="text"
          rows={15}
          placeholder={"Enter Chanel Description"}
          className={"ibox"}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="submit"
          value={"Submit"}
          onClick={handleSubmit}
          className="ibtn"
        />
    </div>
    </div>
  )
}

export default CreateEditChannel