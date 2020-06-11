// non API version
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  //dummyData inport
  const API_HOST = "http://localhost:8000";

  ///////////////////api call////////////////////

  const getData = async () => {
    try {

      //3개의 data call 
      const result = {}
      const boards = await axios.get(`${API_HOST}/boards`);
      const users = await axios.get(`${API_HOST}/users`);
      const levels = await axios.get(`${API_HOST}/levels`);

      //data 배열 추출
      const boardList = boards.data.results;
      const userList = users.data.results;
      const levelList = levels.data.results;


      //results list map 
      const results = boardList.map(board => {
        return {
          ...board,
          user_name: userList.find(user => user.key === board.user).name,
          user_level: userList.find(user => user.key === board.user).level
        }
      });
      const newResults = results.map(result => {
        return {
          ...result,
          level_text: levelList.find(level => level.level === result.user_level).text
        }
      })

      return newResults;
    } catch (e) {
      throw e
    }
  }

  //  staus을 기준으로 data get
  const [data, setData] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      console.log('res', res);
      setData(res);
    })
  }, [])

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
