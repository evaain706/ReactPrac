import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamDetails from "./TeamDetial";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { apiActions } from "../store/apiSlice";



function Teams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTeamClick = (teamSearch,clubName) => {

    dispatch(apiActions.setTitle(clubName));
    navigate(`/videos/${teamSearch}`);
  };

  const ui = useSelector((state)=> state.ui.isOpen);

  const openModal = (team) => {

    setSelectedTeam(team);
    dispatch(uiActions.openModal());
  }
  const closeModal = () => dispatch(uiActions.closeModal());
 

  useEffect(() => {
    fetch("/teams.json")
      .then((response) => response.json())
      .then((data) => setTeams(data.teams))
      .catch((error) => console.error("에러:", error));
  }, []);

  return (
    <div className="container mx-auto p-4 bg-zinc-300">
    <h1 className="text-3xl font-bold text-center mb-10">EPL 팀목록</h1>
   
  
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {teams.map((team) => (
        <li 
          key={team.id} 
          className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:bg-slate-200 cursor-pointer h-full"
        >
          <img 
            src={team.image} 
            alt={`${team.name} logo`} 
            className="w-24 h-24 object-cover mb-4 rounded-full"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{team.name}</h2>
          <p className="text-gray-600 mb-1">위치: {team.location}</p>
          <p className="text-gray-600 mb-1">경기장: {team.stadium}</p>
          <p className="text-gray-500 text-sm">구단창립년도: {team.founded}</p>
          
          <button 
            className="py-2 px-4  mt-auto me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
            onClick={() => handleTeamClick(team.search,team.name)}
          >
            하이라이트 보기
          </button>

          <button
           className="absolute top-3 right-3 text-gray-600  font-bold rounded-full border-gray-400  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
          onClick={() => {openModal(team)}}>?</button>
        </li>
      ))}
    </ul>

    {ui && <TeamDetails team={selectedTeam} closeModal={closeModal}/>}
 
    
  </div>



  


  
  );
}

export default Teams;
