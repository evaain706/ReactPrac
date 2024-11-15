import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../store/CommuSlice";
import { useSelector } from "react-redux";


//글작성 컴포넌트
const CommuPost = ({ teamId }) => {
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (content === "" || password === "") {
      window.alert("내용/비밀번호를 입력해주세요");
      return;
    }

    const newPost = {
      contents: content,
      password: password,
      date: new Date().toISOString(),
    };

    if (teamId) {
      dispatch(createPost({ teamId, post: newPost }));
    } else {
      console.log("글작성 에러");
    }
    setContent("");
    setPassword("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
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
    </div>
  );
};

export default CommuPost;
