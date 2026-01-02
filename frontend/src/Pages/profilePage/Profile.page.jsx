import { FaUserEdit, FaCamera, FaCheck, FaTimes, FaUserSlash, FaBan } from "react-icons/fa";
import './profile.style.scss'

const ProfilePage = () => {
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
          <h2>Rahanyas</h2>
          <p className="username">@rahanyas.dev</p>
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

        <div className="card-row">
          <div className="user-row">
            <img src="https://i.pravatar.cc/150?img=11" alt="" />
            <span>Akshay</span>
            <div className="actions">
              <button className="accept"><FaCheck /></button>
              <button className="reject"><FaTimes /></button>
            </div>
          </div>
        </div>
      </div>

      {/* FRIENDS LIST */}
      <div className="section">
        <h3>Friends</h3>

        <div className="card-row">
          <div className="user-row">
            <img src="https://i.pravatar.cc/150?img=12" alt="" />
            <span>Arjun</span>
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
      </div>

    </section>
  );
};

export default ProfilePage;
