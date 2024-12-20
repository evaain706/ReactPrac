import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/CommuSlice";
import { useSelector } from "react-redux";
import PublicModal from "./PublicModal";
import { uiActions } from "../store/uiSlice";


//글작성 컴포넌트
const CommuPost = ({ teamId }) => {
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
        let date = new Date(); 
    

    let year = date.getFullYear(); 
    let month =   (date.getMonth() + 1);
    
    let day = date.getDate(); 

    let yyyymmdd = year + "-" + month + "-" + day; 

    if (content === "" || password === "") {
      dispatch(uiActions.publicModalOpen("내용이나 비밀번호가 입력되지않았습니다."));
      return;
    }

    const newPost = {
      contents: content,
      password: password,
      date: yyyymmdd,
      like:0,
      
    };

    if (teamId) {
      dispatch(createPost({ teamId, post: newPost }));
      dispatch(uiActions.publicModalOpen("등록완료"));
    } else {
      console.log("글작성 에러");
    }
    setContent("");
    setPassword("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">

            <button
              className="relative left-20 top-9 text-black  text-2xl font-gmarket font-bold rounded-full border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              onClick={() => { dispatch(uiActions.publicModalOpen('글작성시 비밀번호를 꼭 기억해주세요'))}}
            >
              ?
            </button>
    
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        게시글 작성
        
      </h3>

     
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
        rows="5"
      ></textarea>

      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        작성
      </button>
      <PublicModal/>
    </div>
  
  );
};

export default CommuPost;
