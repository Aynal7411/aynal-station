import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Work With Aynal</div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><a onClick={() => scrollToSection('home')}>Home</a></li>
        <li><a onClick={() => scrollToSection('services')}>Services</a></li>
        <li><a onClick={() => scrollToSection('skills')}>Skills</a></li>
        <li><a onClick={() => scrollToSection('projects')}>Projects</a></li>
        <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
      </ul>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;