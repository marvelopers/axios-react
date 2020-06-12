//efficiency
import axios from "axios";

const API_HOST = "http://localhost:8000";

const instance = axios.create({
  timeout: 3000
});



// const header = (url, user) => {

//   let result;
//   if (url === 'users') {
//     return result = {
//       headers: {
//         'Contents-Type': 'Application/json',
//         'Authorization': 'LOGGEN_IN'
//       }
//     }
//   }
//   result = {
//     headers: {
//       'Contents-Type': 'Application/json'
//     }
//   }

//   return result
// };
//==>
const headerGenerator = (Authotization) => {

  let header = {
    'Contents-Type': 'Application/json'
  }

  if (Authotization) {
    header['Authorization'] = Authotization;
  }

  return { "headers": header };
}


export const api = {

  //App.js 데이터 통신을 위한 data
  getBoardList: async () => {
    const response = await instance.get(`${API_HOST}/boards`, headerGenerator());
    return response.data.results;
  },
  getuserList: async () => {
    const response = await instance.get(`${API_HOST}/users`, headerGenerator("LOGGED_IN"));
    return response.data.results;
  },
  getLevelList: async () => {
    const response = await instance.get(`${API_HOST}/levels`, headerGenerator());
    return response.data.results;
  },

  //App.js return value 함수 : 메모리 효율성
  combineData: (boardList, userList, levelList) => {
    return boardList.map(
      (board) => ({
        ...board,
        user_name: userList.find(user => user.key === board.user).name,
        user_level: userList.find(user => user.key === board.user).level
      }
      )).map(result => ({
        ...result,
        level_text: levelList.find(level => level.level === result.user_level).text
      }));
  }

};
