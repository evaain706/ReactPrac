import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideo, apiActions } from "../store/apiSlice";
import VideoItem from "./VideoItem"; 
import { getTeams } from "../store/leagueSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainBody = () => {
  const navigate = useNavigate();
  const videos = useSelector((state) => state.football.filteredVideos); 
  const dispatch = useDispatch();
  const input = useRef(null);


  const handleBack = () => {
    navigate(-1);

  }

 
  const handleSearch = () => {
    dispatch(apiActions.searchVideo(input.current.value)); 
  };


  useEffect ( () =>  {
    
   async function getMatchVideo ()  {
    dispatch(getVideo());
  };

    getMatchVideo();

  },[dispatch])

  


  

  return (
    <div className="flex flex-col items-center bg-black min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-6">축구 하이라이트</h2>
        <input
          ref={input}
          className="border-4 border-r-4 border-r-slate-900 mb-4"
          type="text"
          placeholder="팀명 입력"
        />
        
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors mb-8"
        >
          검색
        </button>

        <button
          onClick={handleBack}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors mb-8"
        >
          뒤로가기
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <VideoItem key={index} video={video} /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainBody;
