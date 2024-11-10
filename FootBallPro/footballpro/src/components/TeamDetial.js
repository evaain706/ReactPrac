import React from "react";

const TeamDetails = ({ team, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 max-w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={closeModal}
        >
          ✕
        </button>
        <div className="flex flex-col items-center text-center">
          <img 
            src={team.image} 
            alt={`${team.name} logo`} 
            className="w-24 h-24 object-cover mb-4 rounded-full"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{team.name}</h2>
          <p className="text-gray-600 mb-1">위치: {team.location}</p>
          <p className="text-gray-600 mb-1">경기장: {team.stadium}</p>
          <p className="text-gray-500 text-sm">구단창립년도: {team.founded}</p>
          <p className="text-gray-500 text-sm">{team.detail}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;