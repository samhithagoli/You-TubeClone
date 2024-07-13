import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import './home.css';
import { getAllVideo } from '../../actions/video'
import Leftsidebar from "../../components/leftsidebar/leftsidebar";
import ShowVideogrid from '../../components/ShowVideogrid/ShowVideogrid';

export default function Home() {  // Changed 'home' to 'Home'
  const dispatch = useDispatch();
  const vids=useSelector(state=>state.videoReducer)?.data?.filter(q=>q).reverse();
  const NavList = [
    "All","Live", "Python", "Java", "c++", "Animation", "Movies",
    "Science", "Gaming", "Comedy","Music", "Gaming","New to you","Posts"
  ];
  useEffect(() => {
    dispatch(getAllVideo());
  }, [dispatch]);
  return (
    <div className='container_pages_app'>
      <Leftsidebar />
      <div className='container2_pages_app'>
        <div className='navigation_Home'>
          {NavList.map(m => (
            <p key={m} className='btn_nav_home'>
              {m}
            </p>
          ))}
        </div>
        <ShowVideogrid vids={vids} />
      </div>
    </div>
  );
}


 
