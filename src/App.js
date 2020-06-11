import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import axios from 'axios';
// import { name, api } from './api';
import { api } from './api';


function App() {

  // const API_HOST = "http://localhost:8000";

  ///////////////////api call////////////////////

  // useEffect(() => {
  //   axios.get(`${API_HOST}/boards`).then((response) => {
  //     console.log('response', response);
  //   })
  // }, [])

  const getData = async () => {
    try {



      // const result = {}
      // const boards = await axios.get(`${API_HOST}/boards`);
      // const users = await axios.get(`${API_HOST}/users`);
      // const levels = await axios.get(`${API_HOST}/levels`);

      // console.log('boards', boards);
      // const boardList = boards.data.results;
      // const userList = users.data.results;
      // const levelList = levels.data.results;
      // console.log('users', users);
      // console.log('levels', levels);


      const boardList = await api.getBoardList();
      const userList = await api.getuserList();
      const levelList = await api.getLevelList();

      console.log('boardList', boardList);
      console.log('userList', userList);
      console.log('levelList', levelList);

      //return [];
      return api.combineData(boardList, userList, levelList);

      // console.log(boardList, userList, levelList);

      // // result.data.map(() => [boards, users, levels]);
      // //...
      // console.log('result===>', result);

      // const results = boardList.map(board => {
      //   return {
      //     ...board,
      //     user_name: userList.find(user => user.key === board.user).name,
      //     user_level: userList.find(user => user.key === board.user).level
      //   }
      // });

      // const newResults = results.map(result => {
      //   return {
      //     ...result,
      //     level_text: levelList.find(level => level.level === result.user_level).text
      //   }
      // })

      // return newResults;
    } catch (e) {
      throw e
    }
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      console.log('res', res);
      setData(res);
    })
  }, [])


  // useEffect(() => {
  //   const result = getData();
  //   result.data.map();
  //   console.log(result);
  // })



  // useEffect(() => {
  //   axios.get(`${API_HOST}/users`).then((response) => {
  //     console.log('response', response);
  //   })
  // }, [])

  // useEffect(() => {
  //   axios.get(`${API_HOST}/levels`).then((response) => {
  //     console.log('response', response);
  //   })
  // }, [])



  //   const data = {
  //     [
  //       boardData: {
  //       key: Key,
  //       title: title,
  //       contents: contents,
  //       user: user
  //     },
  //     userData: {
  //       key: Key,
  //       name: name,
  //       level: level
  //     },
  //     levelData: {
  //       level: level,
  //       text: text
  //     } 
  //     ]

  // }


  ///////////////////////////////////////

  return (
    <div className="App">

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>contents</th>
            <th>user_name</th>
            <th>level_text</th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => {
            return (
              <tr>
                <td>{d.title}</td>
                <td>{d.contents}</td>
                <td>{d.user_name}</td>
                <td>{d.level_text}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
