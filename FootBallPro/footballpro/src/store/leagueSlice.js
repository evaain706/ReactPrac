import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const leagueSlice = createSlice({
 name:'epl',
 initialState:{teams:[]},
 reducers:{
 
  applyTeams (state,action) {
    state.teams = action.payload;

  }

 }


})


// const options = {method: 'GET'};


// fetch('http://site.api.espn.com/apis/site/v2/sports/soccer/teams', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));

//thunk

const options = {
    method: 'GET',
    url: 'https://livescore6.p.rapidapi.com/competitions/get-table',
    params: {CompId: '34'},
    headers: {
      'x-rapidapi-key': 'e171f114famsh4b3a4b4200af8b1p186561jsn5ee503473b0b',
      'x-rapidapi-host': 'livescore6.p.rapidapi.com'
    }
  };

export const getTeams = () => {
 
    return async (dispatch) => {
        try {
            const response = await axios.request(options);
            dispatch(leagueActions.applyTeams(response.data));
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
      

    }

}



  
  try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }





export const leagueActions = leagueSlice.actions;
export default  leagueSlice.reducers;