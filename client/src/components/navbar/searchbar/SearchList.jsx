import React from 'react'
import "./searchlist.css";
import { FaSearch } from 'react-icons/fa';
function SearchList({Titlearray,setsearchQuery}) {
  return (
    <>
      <div className='container_searchlist'>
      {
        Titlearray.map(m=>{
         return  <p 
         key={m}
         onClick={e=>setsearchQuery(m)}
         className='titleitem'>
            <FaSearch/>
            {m}
        </p>
        })
      }
      
      </div>
    </>
  )
}

export default SearchList
