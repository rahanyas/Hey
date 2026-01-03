import { FaCheck, FaTimes } from "react-icons/fa";
import server from "../utils/axiosInstance.utils";

const ShowReqFriends = ({requestedFriends = [], setRequestedFriends}) => {

    const acceptReq = async (userId) => {
         if(!userId) return;
         console.log('userid : ' , userId)
         try {
            const res = await server.post('feature/acceptreq', {
                acceptee : userId
            });
            console.log('res from acceptReq : ', res);
            if(res?.data?.msg === "req accepted"){
                setRequestedFriends(prev => prev.filter(user => user.id !== userId))
            }
         } catch (err) {
            console.log('err in acceptReq function : ', err)
         }
    };

    const rejectReq = async (userId) => {
      if(!userId) return;
      try {
        const res = await server.patch('feature/rejectreq', {
          rejectee : userId
        });
        // console.log('res from reject req func : ', res)
        if(res?.data?.msg === 'req rejected'){
          setRequestedFriends(prev => prev.filter((user => user.Id !== userId)));
        }
      } catch (err) {
        console.log('err in rejectReq function', err)
      }
    }

    if(requestedFriends.length === 0){
        return <h1 className="info-msg">no request</h1>
    }

    return (
        <>
              {requestedFriends.map(user => (
                    <div className="card-row" key={user.id}>
                      <div className="user-row">
                        <img src={user?.profilePic || "https://i.pravatar.cc/150?img=11"} alt="" />
                        <span>{user?.name}</span>
                        <div className="actions">

                          <button 
                          className="accept" 
                          onClick={() => acceptReq(user?.id)}><FaCheck />
                          </button>

                          <button
                           className="reject"
                           onClick={() => rejectReq(user?.id)}
                           ><FaTimes />
                           </button>
                        </div>
                      </div>
                    </div>
              ))
        }
        </>
    )
};

export default ShowReqFriends;