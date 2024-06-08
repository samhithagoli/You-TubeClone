import React from 'react';
import './searchbar.css';
import { FaSearch } from "react-icons/fa";
import { FiMic } from  "react-icons/fi";
import SearchList from "./SearchList";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchBar() {
  const [searchQuery, setsearchQuery] = useState("");
  const [searchListA, setsearchList] = useState(false);
  const Titlearray = useSelector(s=>s?.videoReducer)
?.data?.filter(q=> q?.videoTitle.toUpperCase().includes(searchQuery?.toUpperCase())).map(m=>m?.videoTitle)
  return (
    <>
        <div className='searchbar_container'>
        <div className='searchbar_container2'>
        <div className='search_div'>
           <input type="text" className='ibox_searchbar' placeholder='Search'
           onChange={e=>setsearchQuery(e.target.value)}
           value={searchQuery}
           onClick={e=>setsearchList(true)}
           />
            <Link to={`/seacrh/${searchQuery}`}>
           <FaSearch className="searchIcon_searchbar"
            onClick={e=>setsearchList(false)}
           />
            </Link>
           <FiMic className="Mic_searchbar"/>
           
           {
            searchQuery&& searchListA&&
            <SearchList
              setsearchQuery={setsearchQuery}
              Titlearray={Titlearray}
            />
           }
            
           
        </div>
        </div>   
        </div>
    </>
  )
}

export default SearchBar;
