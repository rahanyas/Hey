import { FaUserSlash,FaBan } from "react-icons/fa";


const ShowFriends = ({friends}) => {
    if(friends.length === 0){
        return <h1 className="info-msg">no friends</h1>
    }
    return (
        <>
          {friends.map(user => (
        <div className="card-row" key={user._id}>
          <div className="user-row">
            <img src={user?.profilePic || "https://i.pravatar.cc/150?img=12"}alt="" />
            <span>{user?.name}</span>
            <div className="actions">
              <button className="unfriend">
                <FaUserSlash />
              </button>
              <button className="block">
                <FaBan />
              </button>
            </div>
          </div>
        </div>
          ))
}
    
        </>
    )
};

export default ShowFriends;