import axios from "axios";

export const name = '이누리';

const API_HOST = "http://localhost:8000";

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
  combineData: (boardList, userList, levelList) => {
    // const result = boardList.map((board) => {
    //   console.log('board==>', board);
    //   return {
    //     ...board,
    //     user_name: userList.find(user => user.key === board.user).name,
    //     user_level: userList.find(user => user.key === board.user).level
    //   }
    // });

    // const results = result.map(result => {
    //   return {
    //     ...result,
    //     level_text: levelList.find(level => level.level === result.user_level).text
    //   }
    // })

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

function Api() {

  const getData = async () => {
    try {
      const boards = await axios.get(`${API_HOST}/boards`);
      const users = await axios.get(`${API_HOST}/users`);
      const levels = await axios.get(`${API_HOST}/levels`);

      const boardList = boards.data;
      const userList = users.data;
      const levelList = levels.data;

      console.log(boardList);
      console.log(userList);
      console.log(levelList);

    } catch (e) {
      throw e
    }
  }
  // const [api, setBoardList] = getData([]);
  // const [api, setuserList] = useState([]);
  // const [api, setlevelList] = useState([]);

  console.log(getData);
  return api;

}
export default Api;