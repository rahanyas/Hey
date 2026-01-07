import { useState, useEffect, useCallback } from 'react';
import server from '../../utils/axiosInstance.utils';
import SearchResutls from '../../components/SearchResults.compo';
import './addUser.style.scss';

const UserAdd = () => {
    const [userToFind, setUserToFind] = useState('');
    const [result, setResult] = useState([]);
    const [msg, setMsg] = useState('');

const getUsers = useCallback(async (signal) => {
       try {           
           let res = await server.get(`/feature/searchUser?userToFind=${userToFind}`, {signal});
            console.log(res);
           setResult(res.data?.data || []);
           setMsg(res.data?.msg)
       } catch (err) {
           console.log('error in getUser func : ', err)
       }
},[userToFind]);

    useEffect(() => {
        if(!userToFind.trim()) {
            setResult([]);
            return;
        };

        const controller = new AbortController;

        // used controller to avoid race condition, like if i type ra and then after that i type rah to cancel previous req that's why used abbort controller

          let timer = setTimeout(() => {
            getUsers(controller.signal)
          }, 700);

          // used debouncign technique for delaying req

          return () => { 
            clearTimeout(timer) ;
            controller.abort()
        };

    }, [userToFind, getUsers])


  return (
    <section id='contianer'>
        <header>
            {/* input for searching user */}
            <input type="text" placeholder='enter username' onChange={(e) => setUserToFind(e.target.value)}/>
        </header>

        {/* to display content related to search result */}
        <main>
            {/* section for displaying user profile and name with send request btn */}
            {userToFind.length === 0 && (
            <h2>search for users</h2>
            )}

            {userToFind.length > 0 && result.length === 0 && msg && (
            <h2>{msg}</h2>
            )}


            {/* component created to display the result of search  */}
            <SearchResutls result={result}/>

        </main>
    </section>
  )
}

export default UserAdd