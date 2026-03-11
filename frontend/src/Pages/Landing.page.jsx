import { Link } from "react-router-dom";
import '../styles/page/landingPage.style.scss';


const LandingPage = () => {
  return (
<div className="lp-root">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Noise overlay */}
      <div className="noise" />

      {/* Grid lines */}
      <div className="grid-lines" />

      <div className="lp-card">
        {/* Badge */}
        <div className="badge">
          <span className="badge-dot" />
          messaging, reinvented
        </div>

        {/* Headline */}
        <h1 className="headline">
          <span className="headline-thin">say</span>
          <span className="headline-bold"> hey.</span>
        </h1>

        {/* Sub */}
        <p className="subline">
          Chat with anyone. Call. Share moments.<br />
          <em>All in one place — effortlessly.</em>
        </p>

        {/* CTA row */}
        <div className="cta-row">
          <Link to="/login" className="btn-primary">
            <span className="btn-label">Get started</span>
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/signup" className="btn-ghost">
            Create account
          </Link>
        </div>

        {/* Social proof */}
        <p className="social-proof">
          Join <strong>12,000+</strong> people already connected
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
