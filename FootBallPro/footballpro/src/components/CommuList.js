import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../store/CommuSlice";
import CommuPost from "./CommuPost";
import { useParams } from "react-router-dom";
import PublicModal from "./PublicModal";
import { uiActions } from "../store/uiSlice";
import { likePost } from "../store/CommuSlice";


//게시글 리스트 렌더링 & 글작성 컴포넌트 렌더링
const CommuList = () => {
  const { teamid } = useParams();
  const dispatch = useDispatch();
  const teamName = useSelector((state) => state.commu.teamName);
  const posts = useSelector((state) => state.commu.postsByTeam[teamid] || []);
  const status = useSelector((state) => state.commu.status);
  const error = useSelector((state) => state.commu.error);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [currentPost, setCurrnetPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (teamid) {
      dispatch(fetchPosts(teamid));
    }
  }, [dispatch, teamid]);

  const handleDelete = (postId) => {
    setCurrnetPost(postId);
    setIsPasswordModalOpen(true);
  };

  const handleLike = (teamId, postId, isLiked) => {
    dispatch(likePost({ teamId, postId, isLiked }));
  };

  const handlePasswordSubmit = () => {
    const post = posts.find((p) => p.id === currentPost);

    if (post && post.password === password) {
      dispatch(deletePost({ teamId: teamid, postId: currentPost }));
      setIsPasswordModalOpen(false);
      setPassword("");
      setErrorMessage("");
      dispatch(uiActions.publicModalOpen('삭제완료'));
    } else {
      setErrorMessage("비밀번호가 틀렸습니다.");
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
     
      <h2 className="text-2xl font-bold text-center font-gmarket mb-6 text-gray-800">{teamName} 게시판</h2>
    
      
     
      <CommuPost  className="text-center"teamId={teamid} />
     
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:bg-slate-100 cursor-pointer group"
            key={post.id}
          >
            <p className="text-md font-gmarket font-bold text-gray-700">{post.contents}</p>
            <small className="text-xs text-gray-500">{post.date}</small>
            <h2>좋아요:{post.like}</h2>
            <div className="flex flex-row">
            <button 
              onClick={() => handleLike(teamid,post.id,post.isLiked)} 
              className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition mr-3"
            >
              좋아요
            </button>
            <button 
              onClick={() => handleDelete(post.id)} 
              className="mt-2 bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
            >
              삭제
            </button>

            </div>
        
          </li>
        ))}
      </ul>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">비밀번호를 입력하세요</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            <button 
              onClick={handlePasswordSubmit} 
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mb-2"
            >
              확인
            </button>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <button 
              onClick={() => setIsPasswordModalOpen(false)} 
              className="w-full bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              취소
            </button>
          </div>
        </div>
      )}
      <PublicModal/>
    </div>
  );
};

export default CommuList;
