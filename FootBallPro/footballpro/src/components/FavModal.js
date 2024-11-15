import React from "react";
import { useSelector } from "react-redux";
import { favActions } from "../store/FavSlice";
import { useDispatch } from "react-redux";


//선호하는팀 배열 렌더링 컴포넌트
const FavModal = ({closeModal}) => {

    const dispatch = useDispatch();

    const team = useSelector((state)=> state.fav.fav)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-gmarket overflow-scroll">


      {team.length > 0 ?
        <div className="bg-white shadow-lg rounded-lg p-6 w-96 max-w-full relative">
        <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 "
            onClick={closeModal}
          >
            ✕
          </button>
        
          <div className="flex flex-col items-center text-center">
          {team.map((team) => (
          <li 
            key={team.id} 
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:bg-slate-200 cursor-pointer h-full group mb-3"
          >
            <img 
              src={team.image} 
              alt={`${team.name} logo`} 
              className="  w-24 h-24 object-cover mb-4 rounded-full group-hover:animate-bounce"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{team.name}</h2>
            <p className="text-gray-600 mb-1">위치: {team.location}</p>
            <p className="text-gray-600 mb-1">경기장: {team.stadium}</p>
            <p className="text-gray-500 text-sm">구단창립년도: {team.founded}</p>
            <button onClick={() => {dispatch(favActions.RemoveFromFav(team.id))}}>삭제</button>
            
          </li>
        ))}
          </div>
        </div> :
         <div className="bg-white shadow-lg rounded-lg p-6 w-96 max-w-full relative">
         <button
             className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 font-gmarket text-2xl font-bold "
             onClick={closeModal}
           >
             ✕
           </button>
         
            <h2 className="font-gmarket font-bold text-2xl">비어있음</h2>
         </div>}  
    
    </div>
  );
}

export default FavModal;
