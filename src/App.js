import React, { useEffect, useState } from 'react';
import './App.css';
import { api } from './api';


function App() {

  const getData = async () => {
    try {

      //API 데이터 call 
      const boardList = await api.getBoardList();
      const userList = await api.getuserList();
      const levelList = await api.getLevelList();

      //api.js 의 combineData function 실행
      return api.combineData(boardList, userList, levelList);

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
