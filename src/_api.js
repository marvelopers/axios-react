//readability
import axios from "axios";

const API_HOST = "http://localhost:8000";

//export api
export const api = {
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

  //App.js return value 함수 : 가독성
  combineData: (boardList, userList, levelList) => {
    const result = boardList.map((board) => {
      console.log('board==>', board);
      return {
        ...board,
        user_name: userList.find(user => user.key === board.user).name,
        user_level: userList.find(user => user.key === board.user).level
      }
    });
    const results = result.map(result => {
      return {
        ...result,
        level_text: levelList.find(level => level.level === result.user_level).text
      }
    })
  }
};
