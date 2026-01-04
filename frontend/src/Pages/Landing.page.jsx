import { Link } from "react-router-dom";
import '../styles/page/landingPage.style.scss';

const LandingPage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-head">
          Welcome to hey
        </h1>
        <p className="home-subhead">
          Connect with friends, family, and colleagues instantly. Chat, call, and share your moments in one place.
        </p>
        <Link to="/login" className="home-btn">
          login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
