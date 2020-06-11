//efficiency
import axios from "axios";

const API_HOST = "http://localhost:8000";

export const api = {

  //App.js 데이터 통신을 위한 data
  getBoardList: async () => {
    const response = await axios.get(`${API_HOST}/boards`);
    return response.data.results;
  },
  getuserList: async () => {
    const response = await axios.get(`${API_HOST}/users`);
    return response.data.results;
  },
  getLevelList: async () => {
    const response = await axios.get(`${API_HOST}/levels`);
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
