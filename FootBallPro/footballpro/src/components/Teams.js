
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamDetails from "./TeamDetial";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice"; 
import { apiActions } from "../store/apiSlice";
import { favActions } from "../store/FavSlice";
import FavModal from "./FavModal";
import PublicModal from "./PublicModal";
import { commuActions } from "../store/CommuSlice";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleTeamClick = (teamSearch, clubName) => {
    dispatch(apiActions.setTitle(clubName));
    navigate(`/videos/${teamSearch}`);
  };

  const ui = useSelector((state) => state.ui.isOpen);
  const favui = useSelector((state) => state.ui.isFavOpen);
  const fav = useSelector((state) => state.fav.fav);

  const AddToFav = (team) => {
  
    if (fav.some(item => item.id === team.id)) {
      dispatch(uiActions.publicModalOpen(`${team.name} 팀은 이미 즐겨찾기에 있습니다`)); 
      return;
    }

    dispatch(favActions.AddToFav(team));
    dispatch(uiActions.publicModalOpen(`${team.name} 팀이 즐겨찾기에 추가되었습니다`));
  
  
  };
  

  const RemoveFromFav = (TeamName) => {
    dispatch(favActions.RemoveFromFav(TeamName));
  };

  const NavigateToCommu = (teamId,teamName) => {

    console.log(teamId,teamName);

    dispatch(commuActions.setTeamName(teamName));
    dispatch(commuActions.setTeamId(teamId));
    navigate(`/commu/${teamId}`);
  }


  const openModal = (team) => {
    setSelectedTeam(team);
    dispatch(uiActions.openModal());
  };

  const closeModal = () => dispatch(uiActions.closeModal());

  const openFav = () => {
    dispatch(uiActions.openFav());
  };

  const closeFav = () => dispatch(uiActions.closeFav());

  useEffect(() => {
    fetch("/teams.json")
      .then((response) => response.json())
      .then((data) => setTeams(data.teams))
      .catch((error) => console.error("에러:", error));
  }, []);

  return (
    <div className="flex flex-col mx-auto p-4 bg-slate-200">
      <h1 className="text-black text-4xl font-bold text-center mb-10 font-gmarket">
        English Premier League{" "}
      </h1>

      {/* <div>
        <button
          className="mt-auto me-4 mb-2 text-xl font-bold text-gray-900 focus:outline-none bg-white rounded-full border-spacing-9 border-gray-200 hover:bg-gray-100 hover:text-slate-600 focus:z-10 focus:ring-4 focus:ring-gray-100 font-gmarket border-r-8 "
          onClick={() => {
            openFav();
          }}
        >
          추가한 팀 보기
        </button>
      </div> */}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 font-gmarket">
        {teams.map((team) => (
          <li
            key={team.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:bg-slate-200 cursor-pointer h-full group"
          >
            <img
              src={team.image}
              alt={`${team.name} logo`}
              className="w-24 h-24 object-cover mb-4 rounded-full group-hover:animate-bounce"
            />
            <h2 className="text-xl font-bold text-gray-800 mb-2">{team.name}</h2>
            <p className="text-gray-600 mb-1">위치: {team.location}</p>
            <p className="text-gray-600 mb-1">경기장: {team.stadium}</p>
            <p className="text-gray-500 text-sm">구단창립년도: {team.founded}</p>

            <button
              className="py-2 px-4 mt-auto me-2 mb-2 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-slate-600 focus:z-10 focus:ring-4 focus:ring-gray-100 font-gmarket"
              onClick={() => handleTeamClick(team.search, team.name)}
            >
              하이라이트 보기
            </button>

            <button
                onClick={() => {
                  NavigateToCommu(team.id,team.name)
                }}
              >
                게시판으로 이동
              </button>

            {/* <button onClick={() => { AddToFav(team) }}>추가</button> */}

            <button
              className="absolute top-3 right-3 text-gray-600 font-bold rounded-full border-gray-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              onClick={() => { openModal(team) }}
            >
              ?
            </button>
          </li>
        ))}
      </ul>

      {ui && <TeamDetails team={selectedTeam} closeModal={closeModal} />}
      {favui && <FavModal closeModal={closeFav} />}
      
     
      <PublicModal />
    </div>
  );
};

export default Teams;
