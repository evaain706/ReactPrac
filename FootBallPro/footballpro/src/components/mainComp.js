import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVideo, apiActions } from "../store/apiSlice";
import VideoItem from "./VideoItem";
import { useParams, useNavigate } from "react-router-dom";

//비디오 표시 메인컴포넌트
const MainBody = () => {
  const { teamSearch } = useParams();
  const navigate = useNavigate();
  const videos = useSelector((state) => state.football.filteredVideos);
  const title = useSelector((state) => state.football.title);
  const loading = useSelector((state)=> state.football.isloading);
  const dispatch = useDispatch();
  const input = useRef(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = () => {
    dispatch(apiActions.searchVideo(input.current.value));
  };

  useEffect(() => {
    async function fetchVideos() {
      await dispatch(getVideo());
      dispatch(apiActions.searchVideo(teamSearch)); 
    }
    fetchVideos();
  }, [dispatch, teamSearch]);

  return (
    <div className="flex flex-col items-center bg-black min-h-screen py-8 font-gmarket ">
      <div className="container mx-auto px-4">

        {{title} ?<h2 className="text-3xl font-bold text-center text-white mb-6 ">{title} 하이라이트</h2> : <h2 className="text-3xl font-bold text-center text-white mb-6">하이라이트</h2> }
       
        {/* <input
          ref={input}
          className="border-4 border-r-4 border-r-slate-900 mb-4"
          type="text"
          placeholder="팀명 입력"
        /> */}
        {/* <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors mb-8">
          검색
        </button> */}
        <button onClick={handleBack} className="px-4 py-2 bg-white text-black rounded hover:bg-gray-500 transition-colors mb-8 font-bold">
          팀 목록으로 이동
        </button>
        <div>
        {loading ? (
      
        <div className="text-white text-center mt-8">불러오는중...</div>
      ) : videos.length > 0 ? (
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <VideoItem key={index} video={video} />
          ))}
        </div>
      ) : (
      
        <div className="text-white text-center mt-8">해당팀의 하이라이트가 존재하지 않습니다.</div>
      )}
</div>
      
      </div>
    </div>
  );
};

export default MainBody;
