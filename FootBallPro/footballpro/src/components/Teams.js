import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Teams() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const handleTeamClick = (teamSearch) => {
    navigate(`/videos/${teamSearch}`);
  };

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
            onClick={() => handleTeamClick(team.search)}
          >
            하이라이트 보기
          </button>
        </li>
      ))}
    </ul>
  </div>
  
  );
}

export default Teams;
