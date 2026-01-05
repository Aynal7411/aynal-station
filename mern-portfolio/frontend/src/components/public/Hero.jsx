const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">I am a MERN Stack Developer</h1>
        <p className="hero-subtitle">Building Full-Stack Web Applications</p>
        <p className="hero-description">
          Specializing in JavaScript, MongoDB, Express.js, React.js, and Node.js
        </p>
        <button className="cta-button" onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}>
          Let's Connect
        </button>
      </div>
    </section>
  );
};

export default Hero;