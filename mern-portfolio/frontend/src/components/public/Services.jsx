const Services = () => {
  const services = [
    {
      icon: '💻',
      title: 'Frontend Development',
      description: 'Building responsive and interactive UIs with React.js, modern CSS, and state management.'
    },
    {
      icon: '⚙️',
      title: 'Backend Development',
      description: 'Creating robust APIs with Node.js, Express.js, and implementing business logic.'
    },
    {
      icon: '🗄️',
      title: 'Database Design',
      description: 'Designing and optimizing MongoDB databases with efficient data models and queries.'
    }
  ];

  return (
    <section className="services-section" id="services">
      <h2 className="section-title">What I Do</h2>
      <div className="cards-grid">
        {services.map((service, index) => (
          <div className="card" key={index}>
            <div className="card-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;