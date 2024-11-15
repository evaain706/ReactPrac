import React from "react";


//하이라이트 비디오 렌더링 컴포넌트
//memo를 사용한 최적화
const VideoItem = React.memo(({ video }) => {
  console.log('Rendering VideoItem');
  return (
    <div
      className="bg-slate-200 shadow-md rounded p-4 transition-transform transform hover:scale-105"
    >
      <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
      <a
        href={video.matchviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        경기 보기
      </a>
      <p className="text-gray-500 mb-2">{new Date(video.date).toLocaleString()}</p>

      <div className="mt-4">
        {video.videos.length > 0 && (
          <div
            className="embed-responsive mb-4"
            dangerouslySetInnerHTML={{ __html: video.videos[0].embed }}
          />
        )}
      </div>
    </div>
  );
});

export default VideoItem;
