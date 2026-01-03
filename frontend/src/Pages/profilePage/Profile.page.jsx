import { FaUserEdit, FaCamera, FaCheck, FaTimes, FaUserSlash, FaBan } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import server from "../../utils/axiosInstance.utils";
import ShowReqFriends from "../../components/RequestedFriends.compo";
import ShowFriends from "../../components/ShowFriends.compo";
import {useSelector} from 'react-redux';
import './profile.style.scss'

const ProfilePage = () => {

  const [requestedFriends, setRequestedFriends]  = useState([]);

  const [friends, setFriends] = useState([]);
  const {name} = useSelector(state => state.user);

  useEffect(() => {

    //both run in parallel,
    // independent failures wont block each other
    async function fetchData(){
        await  Promise.allSettled([
            getFriendReqs(),
            getFriends()
          ])
    };

    fetchData()

  },[]);


  const getFriendReqs = async () => {
    try {
      const res = await server.get('feature/showReq');
      // console.log('res from getFriendReqs : ', res);
      setRequestedFriends(res?.data?.data)
    } catch (err) {
      console.log('error in getFriendReqs function : ', err)
    }
  }

  const getFriends = async () => {
    try {
      const res = await server.get('feature/showFriends');
      // console.log('res : ', res)
      setFriends(res?.data?.data?.friends)
    } catch (err) {
      console.log('error in get friends func : ', err)
    }
  }


  return (
    <section className="profile-page">

      {/* PROFILE HEADER */}
      <div className="profile-card">
        <div className="profile-pic">
          <img
            src="https://i.pravatar.cc/300"
            alt="profile"
          />
          <div className="change-pic">
            <FaCamera />
          </div>
        </div>

        <div className="profile-info">
          <h2>{name}</h2>
          <p className="bio">
            Building scalable systems & real-time applications.
          </p>
          <button className="edit-btn">
            <FaUserEdit /> Edit Profile
          </button>
        </div>
      </div>

      {/* FRIEND REQUESTS */}
      <div className="section">
        <h3>Friend Requests</h3>

        <ShowReqFriends requestedFriends={requestedFriends} setRequestedFriends={setRequestedFriends}/>

      </div>

      {/* FRIENDS LIST */}
      <div className="section">
        <h3>Friends</h3>

        <ShowFriends friends={friends}/>

      </div>

    </section>
  );
};

export default ProfilePage;
