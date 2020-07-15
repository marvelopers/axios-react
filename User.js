import React, { useEffect, useReducer} from 'react';
import useAsync, {reducer} from '../reducer/reducer';
import axios from 'axios';

async function getUser(){
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
    );
    return response.data;
}

function User(){
    // const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    // const [state, dispatch] = useReducer(reducer,{
    //     loading: false,
    //     data : null,
    //     error : null
    // })

    const [state, refectch] = useAsync(getUser,[]);

    const { loading, data : user, error } = state;

    // const fetchUser = async ()=> {
    //     try{
    //         //요청 시작 시에는 error와 users를 초기화하고 
    //         setError(null);
    //         setUser(null);
    //         //loading 상태를 true로 바꾼다.
    //         setLoading(true);
    //         const response = await axios.get(
    //             "https://jsonplaceholder.typicode.com/users"
    //         );
    //         setUser(response.data);
    //     }catch(e){
    //         setError(e);
    //     }
    //     setLoading(false);
    // };

    // const fetchUser = async() => {
    //     dispatch({type:'LOADING'});
    //     try{
    //         const response = await axios.get(
    //             'https://jsonplaceholder.typicode.com/users'
    //         );
    //         dispatch({type:'SUCCESS', data:response.data});
    //     }catch(e){
    //         dispatch({type:'ERROR', error:e});
    //     }
    // }

    // useEffect(()=>{
    //     fetchUser();
    // },[]);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!user) return null;
    return (
        <>
        <ul>
            {user.map(user=>(
                <li key={user.id}>
                    {user.username}({user.name})
                </li>
            ))}
        </ul>
        <button onClick={refectch}>CALL</button>
        </>
    );
}

export default User;