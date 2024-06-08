import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LeftSidebar from '../../components/leftsidebar/leftsidebar';
import ShowVideoGrid from '../../components/ShowVideogrid/ShowVideogrid';

function Search() {
  console.log('Search component mounted');

  const { searchQuery } = useParams();
  console.log('Search Query:', searchQuery);

  // useSelector should be called first, before any conditional logic or useMemo
  const { data: videos, loading, error } = useSelector((state) => {
    console.log('Redux State:', state);
    return state.videoReducer;
  });

  // Memoize the filtered videos
  const filteredVideos = useMemo(() => {
    if (!videos) return [];
    return videos
      .filter((q) => q?.videoTitle?.toUpperCase().includes(searchQuery.toUpperCase()))
      .reverse();
  }, [videos, searchQuery]);

  if (loading) {
    console.log('Loading videos...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.log('Error loading videos:', error);
    return <div>Error loading videos</div>;
  }

  if (!videos) {
    console.log('No videos in state');
    return <div>No videos available</div>;
  }

  console.log('Filtered Videos:', filteredVideos);

  return (
    <div className="container_pages_app">
      <LeftSidebar />
      <div className="ccontaine2_pages_app">
        <h2 style={{ color: 'black' }}>Search Results for {searchQuery}...</h2>
        {filteredVideos.length > 0 ? (
          <ShowVideoGrid vids={filteredVideos} />
        ) : (
          <div>No videos found</div>
        )}
      </div>
    </div>
  );
}

export default Search;
